import { createWallet } from "../wallet/wallet";
import SDKErrors from "./errors";
import { AccountData } from "@cosmjs/proto-signing";
import Relayer from "../relayer/relayer";
import { RelayReply } from "../proto/relay_pb";
import { StateTracker, createStateTracker } from "../stateTracker/stateTracker";
import { Session } from "../types/types";

class LavaSDK {
  private lavaEndpoint: string;
  private privKey: string;
  private chainID: string;
  private rpcInterface: string;

  private stateTracker: StateTracker | Error;
  private account: AccountData | Error;
  private relayer: Relayer | Error;

  private activeSession: Session | Error;

  constructor(
    endpoint: string,
    chainID: string,
    rpcInterface: string,
    privKey: string
  ) {
    this.chainID = chainID;
    this.rpcInterface = rpcInterface;
    this.privKey = privKey;
    this.lavaEndpoint = endpoint;

    this.account = SDKErrors.errAccountNotInitialized;
    this.relayer = SDKErrors.errRelayerServiceNotInitialized;
    this.stateTracker = SDKErrors.errStateTrackerServiceNotInitialized;
    this.activeSession = SDKErrors.errSessionNotInitialized;
  }

  async init() {
    // Initialize wallet

    // Create wallet
    const wallet = await createWallet(this.privKey);

    // Get account from wallet
    this.account = await wallet.getConsumerAccount();

    // print account detail
    wallet.printAccount(this.account);

    // Initialize state tracker

    // Create state tracker
    this.stateTracker = await createStateTracker(this.lavaEndpoint);

    // Initialize relayer

    // Get pairing list for current epoch
    this.activeSession = await this.stateTracker.getSession(
      this.account,
      this.chainID,
      this.rpcInterface
    );

    // Create relayer
    this.relayer = new Relayer(this.chainID, this.privKey);
  }

  async sendRelay(method: string, params: string[]): Promise<RelayReply> {
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
      if (this.activeSession instanceof Error) {
        throw SDKErrors.errSessionNotInitialized;
      }

      // Check if new epoch has started
      if (this.newEpochStarted()) {
        this.activeSession = await this.stateTracker.getSession(
          this.account,
          this.chainID,
          this.rpcInterface
        );
      }

      const consumerProviderSession = this.stateTracker.pickRandomProvider(
        this.activeSession.PairingList
      );

      // Send relay
      const relayResponse = await this.relayer.sendRelay(
        method,
        params,
        consumerProviderSession
      );

      console.log(this.activeSession);

      return relayResponse;
    } catch (err) {
      throw err;
    }
  }

  private newEpochStarted(): boolean {
    // Check if activeSession was initialized
    if (this.activeSession instanceof Error) {
      throw SDKErrors.errSessionNotInitialized;
    }

    const now = new Date();

    return now.getTime() > this.activeSession.NextEpochStart.getTime();
  }
}

export async function createLavaSDK(
  endpoint: string,
  chainID: string,
  rpcInterface: string,
  privKey: string
): Promise<LavaSDK> {
  // Create lavaSDK
  const lavaSDK = new LavaSDK(endpoint, chainID, rpcInterface, privKey);

  // Initialize lavaSDK
  await lavaSDK.init();

  return lavaSDK;
}
