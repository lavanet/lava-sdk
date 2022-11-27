import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {
  QueryClientImpl as EpochQueryService,
  QueryParamsRequest,
} from "../codec/epochstorage/query";
import {
  QueryClientImpl,
  QueryGetPairingRequest,
  QueryGetPairingResponse,
  QueryUserEntryRequest,
} from "../codec/pairing/query";
import {
  ConsumerSessionWithProvider,
  Endpoint,
  SingleConsumerSession,
} from "../types/types";
import StateTrackerError from "./errors";
import { AccountData } from "@cosmjs/proto-signing";
import Long from "long";

export class StateTracker {
  private queryService: QueryClientImpl | Error;
  private epochQueryService: EpochQueryService | Error;
  private tendermintClient: Tendermint34Client | Error;

  constructor() {
    this.queryService = StateTrackerError.errQueryServiceNotInitialized;
    this.epochQueryService =
      StateTrackerError.errEpochQueryServiceNotInitialized;
    this.tendermintClient =
      StateTrackerError.errTendermintClientServiceNotInitialized;
  }

  async init(endpoint: string) {
    const tmClient = await Tendermint34Client.connect(endpoint);
    const queryClient = new QueryClient(tmClient);
    const rpcClient = createProtobufRpcClient(queryClient);

    this.queryService = new QueryClientImpl(rpcClient);
    this.epochQueryService = new EpochQueryService(rpcClient);
    this.tendermintClient = tmClient;
  }

  async getConsumerSession(
    account: AccountData,
    chainID: string,
    rpcInterface: string
  ): Promise<SingleConsumerSession> {
    // Fetch pairing
    const pairing = await this.getPairing(account, chainID, rpcInterface);

    // Pick provider
    const consumerSession = this.pickRandomProvider(pairing);

    // Return session
    return consumerSession.Session;
  }

  // Get pairing list for specified wallet in current epoch
  private async getPairing(
    account: AccountData,
    chainID: string,
    rpcInterface: string
  ): Promise<Array<ConsumerSessionWithProvider>> {
    try {
      if (this.tendermintClient instanceof Error) {
        throw StateTrackerError.errTendermintClientServiceNotInitialized;
      }

      // Create pairing request for getPairing method
      const pairingRequest = {
        chainID: chainID,
        client: account.address,
      };

      // Get pairing from the chain
      const pairingResponse = await this.getPairingFromChain(pairingRequest);

      // Extract providers from pairing response
      const providers = pairingResponse.providers;

      // Initialize ConsumerSessionWithProvider array
      const pairing: Array<ConsumerSessionWithProvider> = [];

      // Fetch latest block
      const blockResponse = await this.tendermintClient.block();

      // Fetch latest block number
      const latestBlockNumber = blockResponse.block.header.height;

      // fetch epoch size
      const epochNumber = await this.getEpochNumber(latestBlockNumber);

      // create request for getting userEntity
      const userEntityRequest = {
        address: account.address,
        chainID: chainID,
        block: new Long(latestBlockNumber),
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

        // TODO when initializing relevantEndpoints it needs to check if valid
        const newPairing = new ConsumerSessionWithProvider(
          account.address,
          relevantEndpoints,
          new SingleConsumerSession(
            0,
            0,
            1,
            relevantEndpoints[0],
            (epochNumber - 1) * 20
          ),
          maxcu,
          0,
          false,
          epochNumber
        );

        // Add newly created pairing in the pairing list
        pairing.push(newPairing);
      }

      return pairing;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  private pickRandomProvider(
    providers: Array<ConsumerSessionWithProvider>
  ): ConsumerSessionWithProvider {
    // Remove providers which does not match criteria
    const validProviders = providers.filter((item) => item.MaxComputeUnits > 0);

    // TODO check with Ran how to know if provider is blocked?

    // Pick random provider
    const random = Math.floor(Math.random() * validProviders.length);

    return validProviders[random];
  }

  private async getPairingFromChain(
    request: QueryGetPairingRequest
  ): Promise<QueryGetPairingResponse> {
    // Check if query service was initialized
    if (this.queryService instanceof Error) {
      throw StateTrackerError.errQueryServiceNotInitialized;
    }

    // Get pairing from the chain
    const queryResult = await this.queryService.GetPairing(request);

    return queryResult;
  }

  private async getMaxCuForUser(
    request: QueryUserEntryRequest
  ): Promise<number> {
    // Check if query service was initialized
    if (this.queryService instanceof Error) {
      throw StateTrackerError.errQueryServiceNotInitialized;
    }

    // Get pairing from the chain
    const queryResult = await this.queryService.UserEntry(request);

    // return maxCu from userEntry
    return queryResult.maxCU.low;
  }

  private async getEpochNumber(latestBlockNumber: number) {
    // Check if query service was initialized
    if (this.epochQueryService instanceof Error) {
      throw StateTrackerError.errEpochQueryServiceNotInitialized;
    }

    // Create params request
    const epochRequst: QueryParamsRequest = {};

    // Get epoch params from the chain
    const queryResult = await this.epochQueryService.Params(epochRequst);

    // Extract epoch size from params
    const epochSize = queryResult.params?.epochBlocks.low;
    if (epochSize == undefined) {
      throw new Error("Epoch size undefined");
    }

    // Calculate epoch number
    const epochNumber = Math.trunc(latestBlockNumber / epochSize) + 1;

    return epochNumber;
  }
}

export async function createStateTracker(endpoint: string) {
  const stateTracker = new StateTracker();

  await stateTracker.init(endpoint);

  return stateTracker;
}
