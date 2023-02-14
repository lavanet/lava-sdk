import {
  QueryClientImpl as PairingQueryClientImpl,
  QueryGetPairingRequest,
  QueryUserEntryRequest,
} from "../codec/pairing/query";
import {
  ConsumerSessionWithProvider,
  Endpoint,
  SingleConsumerSession,
  SessionManager,
} from "../types/types";
import StateTrackerError from "./errors";
import { AccountData } from "@cosmjs/proto-signing";
import StateTrackerErrors from "./errors";
import { LavaProviders } from "../lavaOverLava/providers";
import Relayer from "../relayer/relayer";

export class StateTracker {
  private lavaProviders: LavaProviders | null;
  private relayer: Relayer | null;

  constructor(lavaProviders: LavaProviders | null, relayer: Relayer | null) {
    this.lavaProviders = lavaProviders;
    this.relayer = relayer;
  }

  // Get session return providers for current epoch
  async getSession(
    account: AccountData,
    chainID: string,
    rpcInterface: string
  ): Promise<SessionManager> {
    try {
      if (this.lavaProviders == null) {
        throw StateTrackerError.errLavaProvidersNotInitialized;
      }

      const lavaRPCEndpoint = this.lavaProviders.getNextProvider();

      console.log(
        "Fetching pairing list from ",
        lavaRPCEndpoint.Session.Endpoint
      );
      // Create request for getServiceApis method
      const apis = await this.getServiceApis(
        lavaRPCEndpoint,
        chainID,
        rpcInterface
      );

      // Create pairing request for getPairing method
      const pairingRequest = {
        chainID: chainID,
        client: account.address,
      };

      // Get pairing from the chain
      const pairingResponse = await this.getPairingFromChain(
        lavaRPCEndpoint,
        pairingRequest
      );

      // Set when will next epoch start
      const nextEpochStart = new Date();
      nextEpochStart.setSeconds(
        nextEpochStart.getSeconds() +
          parseInt(pairingResponse.timeLeftToNextPairing)
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
      const maxcu = await this.getMaxCuForUser(
        lavaRPCEndpoint,
        userEntityRequest
      );

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

        const singleConsumerSession = new SingleConsumerSession(
          0, // cuSum
          0, // latestRelayCuSum
          1, // relayNumber
          relevantEndpoints[0],
          parseInt(pairingResponse.currentEpoch),
          provider.address
        );

        // Create a new pairing object
        const newPairing = new ConsumerSessionWithProvider(
          account.address,
          relevantEndpoints,
          singleConsumerSession,
          maxcu,
          0, // used compute units
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
    lavaRPCEndpoint: ConsumerSessionWithProvider,
    request: QueryGetPairingRequest
  ): Promise<any> {
    const options = {
      connectionType: "GET",
      url:
        "/lavanet/lava/pairing/get_pairing/" +
        request.chainID +
        "/" +
        request.client,
      data: "",
    };

    const jsonResponse = await this.sendRelayWithRetry(
      options,
      lavaRPCEndpoint
    );

    return jsonResponse;
  }

  private async getMaxCuForUser(
    lavaRPCEndpoint: ConsumerSessionWithProvider,
    request: QueryUserEntryRequest
  ): Promise<number> {
    const options = {
      connectionType: "GET",
      url:
        "/lavanet/lava/pairing/user_entry/" +
        request.address +
        "/" +
        request.chainID,

      data: "?block=" + request.block,
    };

    const jsonResponse = await this.sendRelayWithRetry(
      options,
      lavaRPCEndpoint
    );

    // return maxCu from userEntry
    return parseInt(jsonResponse.maxCU);
  }

  private async getServiceApis(
    lavaRPCEndpoint: ConsumerSessionWithProvider,
    chainID: string,
    rpcInterface: string
  ): Promise<Map<string, number>> {
    const options = {
      connectionType: "GET",
      url: "/lavanet/lava/spec/spec/" + chainID,
      data: "",
    };

    const jsonResponse = await this.sendRelayWithRetry(
      options,
      lavaRPCEndpoint
    );

    if (jsonResponse.Spec == undefined) {
      throw StateTrackerError.errSpecNotFound;
    }

    const apis = new Map<string, number>();

    // Extract apis from response
    for (const element of jsonResponse.Spec.apis) {
      for (const apiInterface of element.api_interfaces) {
        // Skip if interface which does not match
        if (apiInterface.interface != rpcInterface) continue;

        if (apiInterface.interface == "rest") {
          // handle REST apis
          const name = this.convertRestApiName(element.name);
          apis.set(name, parseInt(element.compute_units));
        } else {
          // Handle RPC apis
          apis.set(element.name, parseInt(element.compute_units));
        }
      }
    }
    return apis;
  }

  convertRestApiName(name: string): string {
    const regex = /\{\s*[^}]+\s*\}/g;
    return name.replace(regex, "[^/s]+");
  }

  async sendRelayWithRetry(
    options: any, // TODO add type
    lavaRPCEndpoint: ConsumerSessionWithProvider
  ): Promise<any> {
    var response;
    // TODO make sure relayer is not null
    try {
      response = await this.relayer?.sendRelay(options, lavaRPCEndpoint, 10);
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message.startsWith("user reported very old lava block height")
        ) {
          const currentBlockHeightRegex = /current epoch block:(\d+)/;
          const match = error.message.match(currentBlockHeightRegex);
          const currentBlockHeight = match ? match[1] : null;
          if (currentBlockHeight != null) {
            lavaRPCEndpoint.Session.PairingEpoch = parseInt(currentBlockHeight);
            response = await this.relayer?.sendRelay(
              options,
              lavaRPCEndpoint,
              10
            );
          }
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }

    if (response == undefined) {
      return "";
    }

    const dec = new TextDecoder();
    const decodedResponse = dec.decode(response.getData_asU8());

    const jsonResponse = JSON.parse(decodedResponse);

    return jsonResponse;
  }
}
