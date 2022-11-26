import { createWallet } from "../wallet/wallet";
import SDKErrors from "./errors";
import { AccountData } from "@cosmjs/proto-signing";
import Relayer from "../relayer/relayer";
import { RelayReply } from "../proto/proto/relay_pb";
import { StateTracker, createStateTracker } from "../stateTracker/stateTracker";

class LavaSDK {
  private lavaEndpoint: string;
  private privKey: string;
  private chainID: string;
  private rpcInterface: string;

  private stateTracker: StateTracker | Error;
  private account: AccountData | Error;
  private relayer: Relayer | Error;

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

    // Create state stracker
    this.stateTracker = await createStateTracker(this.lavaEndpoint);

    // Initialize relayer

    // Get current consumer session
    const consumerSession = await this.stateTracker.getConsumerSession(
      this.account,
      this.chainID,
      this.rpcInterface
    );

    // Create relayer
    this.relayer = new Relayer(consumerSession, this.chainID, this.privKey);
  }

  async sendRelay(method: string, params: string[]): Promise<RelayReply> {
    // Check if account was initialized
    if (this.relayer instanceof Error) {
      throw SDKErrors.errRelayerServiceNotInitialized;
    }

    // Send relay
    const relayResponse = await this.relayer.sendRelay(method, params);

    return relayResponse;
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
