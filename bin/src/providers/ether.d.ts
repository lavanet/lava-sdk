import { JsonRpcProvider } from "ethers";
interface SendRelayOptions {
    chainID: string;
    privKey: string;
    pairingListConfig?: string;
}
export declare class LavaEtherProvider extends JsonRpcProvider {
    private lavaSDK;
    constructor(options: SendRelayOptions);
    send(method: string, params: Array<any> | Record<string, any>): Promise<any>;
}
export {};
