import { DEFAULT_LAVA_PAIRING_LIST } from "../config/default";
import {
  ConsumerSessionWithProvider,
  SingleConsumerSession,
  Endpoint,
} from "../types/types";
import { fetchLavaPairing } from "../util/lavaPairing";

export class LavaProviders {
  private providers: ConsumerSessionWithProvider[];
  private network: string;
  private index = 0;
  private accountAddress: string;

  constructor(accountAddress: string, network: string) {
    this.providers = [];
    this.network = network;
    this.accountAddress = accountAddress;
  }

  async init(pairingListConfig: string) {
    var data;

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
}
