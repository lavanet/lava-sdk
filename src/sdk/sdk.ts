import { createWallet } from "../wallet/wallet";
import SDKErrors from "./errors";
import { AccountData } from "@cosmjs/proto-signing";
import Relayer from "../relayer/relayer";
import { RelayReply } from "../proto/relay_pb";
import { SessionManager, ConsumerSessionWithProvider } from "../types/types";
import {
  isValidChainID,
  fetchRpcInterface,
  isNetworkValid,
} from "../util/chains";
import { LavaProviders } from "../lavaOverLava/providers";
import {
  LAVA_CHAIN_ID,
  DEFAULT_LAVA_PAIRING_NETWORK,
  DEFAULT_GEOLOCATION,
} from "../config/default";

export class LavaSDK {
  private privKey: string;
  private chainID: string;
  private rpcInterface: string;
  private network: string;
  private pairingListConfig: string;
  private geolocation: string;

  private lavaProviders: LavaProviders | Error;
  private account: AccountData | Error;
  private relayer: Relayer | Error;

  private activeSessionManager: SessionManager | Error;

  /**
   * Create Lava-SDK instance
   *
   * Use Lava-SDK for dAccess with a supported network. You can find a list of supported networks and their chain IDs at (url).
   *
   * @async
   * @param {LavaSDKOptions} options The options to use for initializing the LavaSDK.
   *
   * @returns A promise that resolves when the LavaSDK has been successfully initialized, returns LavaSDK object.
   */
  constructor(options: LavaSDKOptions) {
    // Extract attributes from options
    const { privateKey, chainID } = options;
    let { rpcInterface, pairingListConfig, network, geolocation } = options;

    // Validate chainID
    if (!isValidChainID(chainID)) {
      throw SDKErrors.errChainIDUnsupported;
    }

    // If rpc is not defined use default for specified chainID
    rpcInterface = rpcInterface || fetchRpcInterface(chainID);

    // Validate rpcInterface
    if (rpcInterface === "") {
      throw SDKErrors.errChainIDUnsupported;
    }

    // If network is not defined use default network
    network = network || DEFAULT_LAVA_PAIRING_NETWORK;

    // Validate network
    if (!isNetworkValid(network)) {
      throw SDKErrors.errNetworkUnsupported;
    }

    // If geolocation is not defined use default geolocation
    geolocation = geolocation || DEFAULT_GEOLOCATION;

    // If lava pairing config not defined set as empty
    pairingListConfig = pairingListConfig || "";

    // Initialize local attributes
    this.chainID = chainID;
    this.rpcInterface = rpcInterface;
    this.privKey = privateKey;
    this.network = network;
    this.geolocation = geolocation;
    this.pairingListConfig = pairingListConfig;
    this.account = SDKErrors.errAccountNotInitialized;
    this.relayer = SDKErrors.errRelayerServiceNotInitialized;
    this.lavaProviders = SDKErrors.errLavaProvidersNotInitialized;
    this.activeSessionManager = SDKErrors.errSessionNotInitialized;

    // Init sdk
    return (async (): Promise<LavaSDK> => {
      await this.init();

      return this;
    })() as unknown as LavaSDK;
  }

  private async init() {
    // Create wallet
    const wallet = await createWallet(this.privKey);

    // Get account from wallet
    this.account = await wallet.getConsumerAccount();

    // Init relayer for lava providers
    const lavaRelayer = new Relayer(LAVA_CHAIN_ID, this.privKey);

    // Create new instance of lava providers
    const lavaProviders = await new LavaProviders(
      this.account.address,
      this.network,
      lavaRelayer,
      this.geolocation
    );

    // Init lava providers
    await lavaProviders.init(this.pairingListConfig);

    // Save lava providers as local attribute
    this.lavaProviders = lavaProviders;

    // Get pairing list for current epoch
    this.activeSessionManager = await this.lavaProviders.getSession(
      this.chainID,
      this.rpcInterface
    );

    // Create relayer for querying network
    this.relayer = new Relayer(this.chainID, this.privKey);
  }

  private async handleRpcRelay(options: SendRelayOptions): Promise<string> {
    try {
      if (this.rpcInterface === "rest") {
        throw SDKErrors.errRPCRelayMethodNotSupported;
      }
      // Extract attributes from options
      const { method, params } = options;

      // Get consumerProvider session
      const consumerProviderSession = await this.getConsumerProviderSession();

      // Get cuSum for specified method
      const cuSum = this.getCuSumForMethod(method);

      const data = this.generateRPCData(method, params);

      // Check if relay was initialized
      if (this.relayer instanceof Error) {
        throw SDKErrors.errRelayerServiceNotInitialized;
      }

      // Construct send relay options
      const sendRelayOptions = {
        data: data,
        url: "",
        connectionType: "GET", // temporary solution to spec changes - remove this when PRT-216 is fixed
      };

      // Send relay
      const relayResponse = await this.relayer.sendRelay(
        sendRelayOptions,
        consumerProviderSession,
        cuSum
      );

      // Return relay in json format
      return this.decodeRelayResponse(relayResponse);
    } catch (err) {
      throw err;
    }
  }

  private async handleRestRelay(
    options: SendRestRelayOptions
  ): Promise<string> {
    try {
      if (this.rpcInterface !== "rest") {
        throw SDKErrors.errRestRelayMethodNotSupported;
      }

      // Extract attributes from options
      const { method, url, data } = options;

      // Get consumerProvider session
      const consumerProviderSession = await this.getConsumerProviderSession();

      // Get cuSum for specified method
      const cuSum = this.getCuSumForMethod(url);

      // Check if relay was initialized
      if (this.relayer instanceof Error) {
        throw SDKErrors.errRelayerServiceNotInitialized;
      }

      let query = "?";
      for (const key in data) {
        query = query + key + "=" + data[key] + "&";
      }

      // Construct send relay options
      const sendRelayOptions = {
        data: query,
        url: url,
        connectionType: method,
      };

      // Send relay
      const relayResponse = await this.relayer.sendRelay(
        sendRelayOptions,
        consumerProviderSession,
        cuSum
      );

      // Return relay in json format
      return this.decodeRelayResponse(relayResponse);
    } catch (err) {
      throw err;
    }
  }

  /**
   * Send relay to network through providers.
   *
   * @async
   * @param options The options to use for sending relay.
   *
   * @returns A promise that resolves when the relay response has been returned, and returns a JSON string
   *
   */
  async sendRelay(
    options: SendRelayOptions | SendRestRelayOptions
  ): Promise<string> {
    if (this.isRest(options)) return await this.handleRestRelay(options);
    return await this.handleRpcRelay(options);
  }

  private generateRPCData(method: string, params: Array<string>): string {
    const stringifyMethod = JSON.stringify(method);
    const stringifyParam = JSON.stringify(params);
    // TODO make id changable
    return (
      '{"jsonrpc": "2.0", "id": 1, "method": ' +
      stringifyMethod +
      ', "params": ' +
      stringifyParam +
      "}"
    );
  }

  private decodeRelayResponse(relayResponse: RelayReply): string {
    // Decode relay response
    const dec = new TextDecoder();
    const decodedResponse = dec.decode(relayResponse.getData_asU8());

    return decodedResponse;
  }

  private getCuSumForMethod(method: string): number {
    // Check if activeSession was initialized
    if (this.activeSessionManager instanceof Error) {
      throw SDKErrors.errSessionNotInitialized;
    }
    // get cuSum for specified method
    const cuSum = this.activeSessionManager.getCuSumFromApi(
      method,
      this.chainID
    );

    // if cuSum is undefiend method does not exists in spec
    if (cuSum == undefined) {
      throw SDKErrors.errMethodNotSupported;
    }

    return cuSum;
  }

  private async getConsumerProviderSession(): Promise<ConsumerSessionWithProvider> {
    // Check if lava providers were initialized
    if (this.lavaProviders instanceof Error) {
      throw SDKErrors.errLavaProvidersNotInitialized;
    }

    // Check if state tracker was initialized
    if (this.account instanceof Error) {
      throw SDKErrors.errAccountNotInitialized;
    }

    // Check if activeSessionManager was initialized
    if (this.activeSessionManager instanceof Error) {
      throw SDKErrors.errSessionNotInitialized;
    }

    // Check if new epoch has started
    if (this.newEpochStarted()) {
      this.activeSessionManager = await this.lavaProviders.getSession(
        this.chainID,
        this.rpcInterface
      );
    }

    // Pick random provider and return
    return this.lavaProviders.pickRandomProvider(
      this.activeSessionManager.PairingList
    );
  }

  private newEpochStarted(): boolean {
    // Check if activeSession was initialized
    if (this.activeSessionManager instanceof Error) {
      throw SDKErrors.errSessionNotInitialized;
    }

    // Get current date and time
    const now = new Date();

    // Return if new epoch has started
    return now.getTime() > this.activeSessionManager.NextEpochStart.getTime();
  }

  private isRest(
    options: SendRelayOptions | SendRestRelayOptions
  ): options is SendRestRelayOptions {
    return (options as SendRestRelayOptions).url !== undefined;
  }
}

/**
 * Options for sending RPC relay.
 */
export interface SendRelayOptions {
  method: string;
  params: Array<string>;
}

/**
 * Options for sending Rest relay.
 */
export interface SendRestRelayOptions {
  method: string;
  url: string;
  // eslint-disable-next-line
  data?: Record<string, any>;
}

/**
 * Options for initializing the LavaSDK.
 */
export interface LavaSDKOptions {
  privateKey: string;
  chainID: string;
  rpcInterface?: string;
  pairingListConfig?: string;
  network?: string;
  geolocation?: string;
}
