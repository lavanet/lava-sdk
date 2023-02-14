import { ConsumerSessionWithProvider } from "../types/types";
export declare class LavaProviders {
    private providers;
    private network;
    private index;
    private accountAddress;
    constructor(accountAddress: string, network: string);
    init(pairingListConfig: string): Promise<void>;
    initDefaultConfig(): Promise<any>;
    initLocalConfig(path: string): Promise<any>;
    getNextProvider(): ConsumerSessionWithProvider;
}
