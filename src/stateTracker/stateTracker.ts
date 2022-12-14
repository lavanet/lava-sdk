import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {
  QueryClientImpl as PairingQueryClientImpl,
  QueryGetPairingRequest,
  QueryGetPairingResponse,
  QueryUserEntryRequest,
} from "../codec/pairing/query";
import {
  QueryClientImpl as SpecQueryClientImpl,
  QueryGetSpecRequest,
} from "../codec/spec/query";
import {
  ConsumerSessionWithProvider,
  Endpoint,
  SingleConsumerSession,
  SessionManager,
} from "../types/types";
import StateTrackerError from "./errors";
import { AccountData } from "@cosmjs/proto-signing";
import StateTrackerErrors from "./errors";

export class StateTracker {
  private pairingQueryService: PairingQueryClientImpl | Error;
  private specQueryService: SpecQueryClientImpl | Error;
  private tendermintClient: Tendermint34Client | Error;

  constructor() {
    this.pairingQueryService =
      StateTrackerError.errPairingQueryServiceNotInitialized;
    this.specQueryService = StateTrackerError.errSpecQueryServiceNotInitialized;
    this.tendermintClient =
      StateTrackerError.errTendermintClientServiceNotInitialized;
  }

  async init(endpoint: string) {
    const tmClient = await Tendermint34Client.connect(endpoint);
    const queryClient = new QueryClient(tmClient);
    const rpcClient = createProtobufRpcClient(queryClient);

    this.pairingQueryService = new PairingQueryClientImpl(rpcClient);
    this.specQueryService = new SpecQueryClientImpl(rpcClient);
    this.tendermintClient = tmClient;
  }

  // Get session return providers for current epoch
  async getSession(
    account: AccountData,
    chainID: string,
    rpcInterface: string
  ): Promise<SessionManager> {
    try {
      if (this.tendermintClient instanceof Error) {
        throw StateTrackerError.errTendermintClientServiceNotInitialized;
      }

      // Create request for getCuSumForChainID method
      const queryGetSpecRequest = {
        ChainID: chainID,
      };
      const apis = await this.getServiceApis(queryGetSpecRequest, rpcInterface);

      // Create pairing request for getPairing method
      const pairingRequest = {
        chainID: chainID,
        client: account.address,
      };

      // Get pairing from the chain
      const pairingResponse = await this.getPairingFromChain(pairingRequest);

      // Set when will next epoch start
      const nextEpochStart = new Date();
      nextEpochStart.setSeconds(
        nextEpochStart.getSeconds() +
          pairingResponse.timeLeftToNextPairing.getLowBits()
      );

      // Extract providers from pairing response
      const providers = pairingResponse.providers;

      // Initialize ConsumerSessionWithProvider array
      const pairing: Array<ConsumerSessionWithProvider> = [];

      // create request for getting userEntity
      const userEntityRequest = {
        address: account.address,
        chainID: chainID,
        block: pairingResponse.currentEpoch,
      };

      // fetch max compute units
      const maxcu = await this.getMaxCuForUser(userEntityRequest);

      //Iterate over providers to populate pairing list
      for (const provider of providers) {
        // Skip providers with no endpoints
        if (provider.endpoints.length == 0) {
          continue;
        }

        // Initialize relevantEndpoints array
        const relevantEndpoints: Array<Endpoint> = [];

        //only take into account endpoints that use the same api interface
        for (const endpoint of provider.endpoints) {
          if (endpoint.useType == rpcInterface) {
            const convertedEndpoint = new Endpoint(endpoint.iPPORT, true, 0);
            relevantEndpoints.push(convertedEndpoint);
          }
        }

        // Skip providers with no relevant endpoints
        if (relevantEndpoints.length == 0) {
          continue;
        }

        // Create a new pairing object
        const newPairing = new ConsumerSessionWithProvider(
          account.address,
          relevantEndpoints,
          new SingleConsumerSession(
            0,
            0,
            1,
            relevantEndpoints[0],
            pairingResponse.currentEpoch.getLowBits(),
            provider.address
          ),
          maxcu,
          0,
          false
        );

        // Add newly created pairing in the pairing list
        pairing.push(newPairing);
      }

      // Create session object
      const sessionManager = new SessionManager(pairing, nextEpochStart, apis);

      return sessionManager;
    } catch (err) {
      throw err;
    }
  }

  pickRandomProvider(
    providers: Array<ConsumerSessionWithProvider>
  ): ConsumerSessionWithProvider {
    // Remove providers which does not match criteria
    const validProviders = providers.filter(
      (item) => item.MaxComputeUnits > item.UsedComputeUnits
    );

    if (validProviders.length === 0) {
      throw StateTrackerErrors.errNoValidProvidersForCurrentEpoch;
    }

    // Pick random provider
    const random = Math.floor(Math.random() * validProviders.length);

    return validProviders[random];
  }

  private async getPairingFromChain(
    request: QueryGetPairingRequest
  ): Promise<QueryGetPairingResponse> {
    // Check if query service was initialized
    if (this.pairingQueryService instanceof Error) {
      throw StateTrackerError.errPairingQueryServiceNotInitialized;
    }

    // Get pairing from the chain
    const queryResult = await this.pairingQueryService.GetPairing(request);

    return queryResult;
  }

  private async getMaxCuForUser(
    request: QueryUserEntryRequest
  ): Promise<number> {
    // Check if query service was initialized
    if (this.pairingQueryService instanceof Error) {
      throw StateTrackerError.errPairingQueryServiceNotInitialized;
    }

    // Get pairing from the chain
    const queryResult = await this.pairingQueryService.UserEntry(request);

    // return maxCu from userEntry
    return queryResult.maxCU.low;
  }

  private async getServiceApis(
    request: QueryGetSpecRequest,
    rpcInterface: string
  ): Promise<Map<string, number>> {
    // Check if query service was initialized
    if (this.specQueryService instanceof Error) {
      throw StateTrackerError.errSpecQueryServiceNotInitialized;
    }

    // Get pairing from the chain
    const queryResult = await this.specQueryService.Spec(request);

    if (queryResult.Spec == undefined) {
      throw StateTrackerError.errSpecNotFound;
    }

    const apis = new Map<string, number>();

    // Extract apis from response
    for (const element of queryResult.Spec.apis) {
      for (const apiInterface of element.apiInterfaces) {
        // Skip if interface does not match
        if (apiInterface.interface != rpcInterface) continue;

        // Currently we do not support rest
        if (apiInterface.interface == "rest") continue;
        else {
          // Handle RPC apis
          apis.set(element.name, element.computeUnits.getLowBits());
        }
      }
    }

    return apis;
  }
}

export async function createStateTracker(endpoint: string) {
  const stateTracker = new StateTracker();

  await stateTracker.init(endpoint);

  return stateTracker;
}
