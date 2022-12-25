import { ConsumerSessionWithProvider, SessionManager } from "../types/types";
import { AccountData } from "@cosmjs/proto-signing";
export declare class StateTracker {
    private pairingQueryService;
    private specQueryService;
    private tendermintClient;
    constructor();
    init(endpoint: string): Promise<void>;
    getSession(account: AccountData, chainID: string, rpcInterface: string): Promise<SessionManager>;
    pickRandomProvider(providers: Array<ConsumerSessionWithProvider>): ConsumerSessionWithProvider;
    private getPairingFromChain;
    private getMaxCuForUser;
    private getServiceApis;
    convertRestApiName(name: string): string;
}
export declare function createStateTracker(endpoint: string): Promise<StateTracker>;
