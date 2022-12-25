import { ConsumerSessionWithProvider } from "../types/types";
import { RelayRequest, RelayReply } from "../proto/relay_pb";
declare class Relayer {
    private chainID;
    private privKey;
    constructor(chainID: string, privKey: string);
    sendRelay(options: SendRelayOptions, consumerProviderSession: ConsumerSessionWithProvider, cuSum: number): Promise<RelayReply>;
    signRelay(request: RelayRequest, privKey: string): Promise<Uint8Array>;
    prepareRequest(request: RelayRequest): Uint8Array;
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
