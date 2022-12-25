export declare class LavaSDK {
    private lavaEndpoint;
    private privKey;
    private chainID;
    private rpcInterface;
    private stateTracker;
    private account;
    private relayer;
    private activeSessionManager;
    /**
     * Create Lava-SDK instance
     *
     * Use Lava-SDK for dAccess with a supported network. You can find a list of supported networks and their chain IDs at (url).
     *
     * @async
     * @param {LavaSDKOptions} options The options to use for initializing the LavaSDK.
     *
     * @returns A promise that resolves when the LavaSDK has been successfully initialized, returns LavaSDK object.
     */
    constructor(options: LavaSDKOptions);
    private init;
    private handleRpcRelay;
    private handleRestRelay;
    /**
     * Send relay to network through providers.
     *
     * @async
     * @param options The options to use for sending relay.
     *
     * @returns A promise that resolves when the relay response has been returned, and returns a JSON string
     *
     */
    sendRelay(options: SendRelayOptions | SendRestRelayOptions): Promise<string>;
    private generateRPCData;
    private decodeRelayResponse;
    private getCuSumForMethod;
    private getConsumerProviderSession;
    private newEpochStarted;
}
/**
 * Options for sending RPC relay.
 */
export interface SendRelayOptions {
    method: string;
    params: Array<string>;
}
/**
 * Options for sending Rest relay.
 */
export interface SendRestRelayOptions {
    method: string;
    url: string;
    data?: Record<string, any>;
}
/**
 * Options for initializing the LavaSDK.
 */
export interface LavaSDKOptions {
    privateKey: string;
    chainID: string;
    lavaEndpoint?: string;
    rpcInterface?: string;
}
