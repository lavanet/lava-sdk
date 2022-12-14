import { createWallet } from "../wallet/wallet";
import SDKErrors from "./errors";
import { AccountData } from "@cosmjs/proto-signing";
import Relayer from "../relayer/relayer";
import { StateTracker, createStateTracker } from "../stateTracker/stateTracker";
import { SessionManager } from "../types/types";
import { isValidChainID, fetchRpcInterface } from "../util/chains";
import { DEFAULT_LAVA_ENDPOINT } from "../config/default";

class LavaSDK {
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
    let { endpoint, rpcInterface } = options;

    // If lava endpoint is not set, use default
    endpoint = endpoint || DEFAULT_LAVA_ENDPOINT;

    // Validate chainID
    if (!isValidChainID(chainID)) {
      throw SDKErrors.errChainIDUnsupported;
    }

    // If the rpc is not defined used the default for specified chainID
    rpcInterface = rpcInterface || fetchRpcInterface(chainID);

    this.chainID = chainID;
    this.rpcInterface = rpcInterface;
    this.privKey = privateKey;
    this.lavaEndpoint = endpoint;

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

  /**
   * Send relay to network through providers
   *
   * @async
   * @param {string} method - A string representing the RPC method name
   * @param {string[]} params - An array of strings representing the RPC parameters
   *
   * @returns A promise that resolves when the relay response has been returned, and returns a JSON string
   *
   */
  async sendRelay(method: string, params: string[]): Promise<string> {
    try {
      // Check if account was initialized
      if (this.relayer instanceof Error) {
        throw SDKErrors.errRelayerServiceNotInitialized;
      }

      // Check if state tracker was initialized
      if (this.stateTracker instanceof Error) {
        throw SDKErrors.errStateTrackerServiceNotInitialized;
      }

      // Check if state tracker was initialized
      if (this.account instanceof Error) {
        throw SDKErrors.errAccountNotInitialized;
      }

      // Check if activeSession was initialized
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

      const consumerProviderSession = this.stateTracker.pickRandomProvider(
        this.activeSessionManager.PairingList
      );

      const cuSum = this.activeSessionManager.getCuSumFromApi(method);

      if (cuSum == undefined) {
        throw SDKErrors.errMethodNotSupportedNoCuSUM;
      }

      // Send relay
      const relayResponse = await this.relayer.sendRelay(
        method,
        params,
        consumerProviderSession,
        cuSum
      );

      // Decode relay response
      const dec = new TextDecoder();
      const decodedResponse = dec.decode(relayResponse.getData_asU8());

      // Return relay in json format
      return decodedResponse;
    } catch (err) {
      throw err;
    }
  }

  private newEpochStarted(): boolean {
    // Check if activeSession was initialized
    if (this.activeSessionManager instanceof Error) {
      throw SDKErrors.errSessionNotInitialized;
    }

    const now = new Date();
    return now.getTime() > this.activeSessionManager.NextEpochStart.getTime();
  }
}

/**
 * Options for initializing the LavaSDK.
 */
interface LavaSDKOptions {
  privateKey: string;
  chainID: string;
  endpoint?: string;
  rpcInterface?: string;
}

export default LavaSDK;
