import { JsonRpcProvider } from "ethers";
import { LavaSDK } from "../sdk/sdk";

interface SendRelayOptions {
  chainID: string;
  privKey: string;
  pairingListConfig?: string;
}

export class LavaEtherProvider extends JsonRpcProvider {
  private lavaSDK: LavaSDK | null;

  constructor(options: SendRelayOptions) {
    super(undefined);
    this.lavaSDK = null;
    return (async (): Promise<LavaEtherProvider> => {
      this.lavaSDK = await new LavaSDK({
        privateKey: options.privKey,
        chainID: options.chainID, // chainID for Cosmos Hub
        pairingListConfig: options.pairingListConfig,
      });

      return this;
    })() as unknown as LavaEtherProvider;
  }

  async send(
    method: string,
    params: Array<any> | Record<string, any>
  ): Promise<any> {
    let stringParams: Array<string> = [];
    if (Array.isArray(params)) {
      stringParams = params.map((param) => String(param));
    } else if (typeof params === "object") {
      stringParams = Object.values(params).map((param) => String(param));
    }
    console.log("Sending ", method + " to Ethereum Mainnet");

    if (this.lavaSDK == null) {
      throw console.error("test");
    }

    const response = await this.lavaSDK.sendRelay({
      method: method,
      params: stringParams,
    });

    const parsedResponse = JSON.parse(response);

    return parsedResponse.result;
  }
}
