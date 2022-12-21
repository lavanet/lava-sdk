import { createWallet } from "../wallet/wallet";
import SDKErrors from "./errors";
import { AccountData } from "@cosmjs/proto-signing";
import Relayer from "../relayer/relayer";
import { RelayReply } from "../proto/relay_pb";
import { StateTracker, createStateTracker } from "../stateTracker/stateTracker";
import { SessionManager, ConsumerSessionWithProvider } from "../types/types";
import { isValidChainID, fetchRpcInterface } from "../util/chains";
import { DEFAULT_LAVA_ENDPOINT } from "../config/default";

export class LavaSDK {
  private lavaEndpoint: string;
  private privKey: string;
  private chainID: string;
  private rpcInterface: string;

  private stateTracker: StateTracker | Error;
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
    let { lavaEndpoint, rpcInterface } = options;

    // If lava endpoint is not set, use default
    lavaEndpoint = lavaEndpoint || DEFAULT_LAVA_ENDPOINT;

    // Validate chainID
    if (!isValidChainID(chainID)) {
      throw SDKErrors.errChainIDUnsupported;
    }

    // If the rpc is not defined used the default for specified chainID
    rpcInterface = rpcInterface || fetchRpcInterface(chainID);

    // Validate rpcInterface
    if (rpcInterface === "") {
      throw SDKErrors.errChainIDUnsupported;
    }

    this.chainID = chainID;
    this.rpcInterface = rpcInterface;
    this.privKey = privateKey;
    this.lavaEndpoint = lavaEndpoint;

    this.account = SDKErrors.errAccountNotInitialized;
    this.relayer = SDKErrors.errRelayerServiceNotInitialized;
    this.stateTracker = SDKErrors.errStateTrackerServiceNotInitialized;
    this.activeSessionManager = SDKErrors.errSessionNotInitialized;

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

    // Initialize state tracker

    // Create state tracker
    this.stateTracker = await createStateTracker(this.lavaEndpoint);

    // Initialize relayer

    // Get pairing list for current epoch
    this.activeSessionManager = await this.stateTracker.getSession(
      this.account,
      this.chainID,
      this.rpcInterface
    );

    // Create relayer
    this.relayer = new Relayer(this.chainID, this.privKey);
  }

  private async handleRpcRelay(options: SendRelayOptions): Promise<string> {
    try {
      if (this.rpcInterface === "rest") {
        throw SDKErrors.errRPCRelayMethodNotSupported;
      }
      // Extract attributes from options
      // TODO change naming for optiosn atribute method both in RPC and REST
      const { method, params } = options;

      // get consumerProvider session
      const consumerProviderSession = await this.getConsumerProviderSession();

      // get cuSum for specified method
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
        connectionType: "",
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

      // get consumerProvider session
      const consumerProviderSession = await this.getConsumerProviderSession();

      // get cuSum for specified method
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
    if (isRest(options)) return await this.handleRestRelay(options);
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
    // Check if state tracker was initialized
    if (this.stateTracker instanceof Error) {
      throw SDKErrors.errStateTrackerServiceNotInitialized;
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
      this.activeSessionManager = await this.stateTracker.getSession(
        this.account,
        this.chainID,
        this.rpcInterface
      );
    }

    // Pick random provider and return
    return this.stateTracker.pickRandomProvider(
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
}

/**
 * Options for sending RPC relay.
 */
interface SendRelayOptions {
  method: string;
  params: Array<string>;
}

/**
 * Options for sending Rest relay.
 */
interface SendRestRelayOptions {
  method: string;
  url: string;
  // eslint-disable-next-line
  data?: Record<string, any>;
}

function isRest(
  options: SendRelayOptions | SendRestRelayOptions
): options is SendRestRelayOptions {
  return (options as SendRestRelayOptions).url !== undefined;
}

/**
 * Options for initializing the LavaSDK.
 */
interface LavaSDKOptions {
  privateKey: string;
  chainID: string;
  lavaEndpoint?: string;
  rpcInterface?: string;
}
