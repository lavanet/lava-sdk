import { ConsumerSessionWithProvider } from "../types/types";
export declare class LavaProviders {
    private providers;
    private network;
    private index;
    private accountAddress;
    constructor(accountAddress: string);
    init(): Promise<void>;
    getNextProvider(): ConsumerSessionWithProvider;
}
