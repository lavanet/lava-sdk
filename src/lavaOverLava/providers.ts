import { DEFAULT_LAVA_PAIRING_LIST } from "../config/default";
import {
  ConsumerSessionWithProvider,
  SingleConsumerSession,
  Endpoint,
} from "../types/types";

export class LavaProviders {
  private providers: ConsumerSessionWithProvider[];
  private network: string;
  private index = 0;
  private accountAddress: string;

  constructor(accountAddress: string) {
    this.providers = [];
    this.network = "mainnet";
    this.accountAddress = accountAddress;
  }

  async init() {
    const response = await fetch(DEFAULT_LAVA_PAIRING_LIST);

    if (!response.ok) {
      throw new Error(`Unable to fetch pairing list: ${response.statusText}`);
    }

    const data = await response.json();

    // Initialize ConsumerSessionWithProvider array
    const pairing: Array<ConsumerSessionWithProvider> = [];

    for (const provider of data[this.network]) {
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

  getNextProvider(): ConsumerSessionWithProvider {
    // TODO add some guard for empty
    const rpcAddress = this.providers[this.index];
    this.index = (this.index + 1) % this.providers.length;
    return rpcAddress;
  }
}
