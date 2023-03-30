import { ConsumerSessionWithProvider } from "../types/types";
import { RelayReply, RelaySession } from "../proto/relay_pb";
declare class Relayer {
    private chainID;
    private privKey;
    constructor(chainID: string, privKey: string);
    sendRelay(options: SendRelayOptions, consumerProviderSession: ConsumerSessionWithProvider, cuSum: number, apiInterface: string): Promise<RelayReply>;
    signRelay(request: RelaySession, privKey: string): Promise<Uint8Array>;
    prepareRequest(request: RelaySession): Uint8Array;
}
/**
 * Options for send relay method.
 */
interface SendRelayOptions {
    data: string;
    url: string;
    connectionType: string;
}
export default Relayer;
