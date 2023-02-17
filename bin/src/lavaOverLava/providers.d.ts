import { ConsumerSessionWithProvider, SessionManager } from "../types/types";
import Relayer from "../relayer/relayer";
export declare class LavaProviders {
    private providers;
    private network;
    private index;
    private accountAddress;
    private relayer;
    private geolocation;
    constructor(accountAddress: string, network: string, relayer: Relayer | null, geolocation: string);
    init(pairingListConfig: string): Promise<void>;
    initDefaultConfig(): Promise<any>;
    initLocalConfig(path: string): Promise<any>;
    getNextLavaProvider(): ConsumerSessionWithProvider;
    getSession(chainID: string, rpcInterface: string): Promise<SessionManager>;
    pickRandomProvider(providers: Array<ConsumerSessionWithProvider>): ConsumerSessionWithProvider;
    private getPairingFromChain;
    private getMaxCuForUser;
    private getServiceApis;
    convertRestApiName(name: string): string;
    sendRelayWithRetry(options: any, lavaRPCEndpoint: ConsumerSessionWithProvider): Promise<any>;
    private isErrorOldBlock;
    private extractBlockNumberFromError;
}
