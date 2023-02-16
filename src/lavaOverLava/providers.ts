import { DEFAULT_LAVA_PAIRING_LIST } from "../config/default";
import {
  ConsumerSessionWithProvider,
  SingleConsumerSession,
  Endpoint,
  SessionManager,
} from "../types/types";
import {
  QueryGetPairingRequest,
  QueryUserEntryRequest,
} from "../codec/pairing/query";
import { fetchLavaPairing } from "../util/lavaPairing";
import Relayer from "../relayer/relayer";
import ProvidersErrors from "./errors";

export class LavaProviders {
  private providers: ConsumerSessionWithProvider[];
  private network: string;
  private index = 0;
  private accountAddress: string;
  private relayer: Relayer | null;

  constructor(
    accountAddress: string,
    network: string,
    relayer: Relayer | null
  ) {
    this.providers = [];
    this.network = network;
    this.accountAddress = accountAddress;
    this.relayer = relayer;
  }

  async init(pairingListConfig: string) {
    let data;

    // if no pairing list config use default
    if (pairingListConfig == "") {
      data = await this.initDefaultConfig();
    } else {
      data = await this.initLocalConfig(pairingListConfig);
    }

    // Initialize ConsumerSessionWithProvider array
    const pairing: Array<ConsumerSessionWithProvider> = [];

    for (const provider of data) {
      const singleConsumerSession = new SingleConsumerSession(
        0, // cuSum
        0, // latestRelayCuSum
        1, // relayNumber
        new Endpoint(provider.rpcAddress, true, 0),
        -1, //invalid epoch
        provider.publicAddress
      );

      // Create a new pairing object
      const newPairing = new ConsumerSessionWithProvider(
        this.accountAddress,
        [],
        singleConsumerSession,
        100000, // invalid max cu
        0, // used compute units
        false
      );

      // Add newly created pairing in the pairing list
      pairing.push(newPairing);
    }

    this.providers = pairing;
  }

  async initDefaultConfig(): Promise<any> {
    const response = await fetch(DEFAULT_LAVA_PAIRING_LIST);

    if (!response.ok) {
      throw new Error(`Unable to fetch pairing list: ${response.statusText}`);
    }

    const data = await response.json();

    return data[this.network];
  }

  async initLocalConfig(path: string): Promise<any> {
    const data = await fetchLavaPairing(path);

    return data[this.network];
  }

  getNextProvider(): ConsumerSessionWithProvider {
    // TODO add some guard for empty
    const rpcAddress = this.providers[this.index];
    this.index = (this.index + 1) % this.providers.length;
    return rpcAddress;
  }

  // Get session return providers for current epoch
  async getSession(
    chainID: string,
    rpcInterface: string
  ): Promise<SessionManager> {
    try {
      if (this.providers == null) {
        throw ProvidersErrors.errLavaProvidersNotInitialized;
      }

      const lavaRPCEndpoint = this.getNextProvider();

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
        client: this.accountAddress,
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
        address: this.accountAddress,
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
          this.accountAddress,
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
      throw ProvidersErrors.errNoValidProvidersForCurrentEpoch;
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
      throw ProvidersErrors.errSpecNotFound;
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
    let response;
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
