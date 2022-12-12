import { SingleConsumerSession } from "../types/types";
import { Secp256k1, sha256 } from "@cosmjs/crypto";
import { fromHex } from "@cosmjs/encoding";
import { grpc } from "@improbable-eng/grpc-web";
import { RelayRequest, RelayReply } from "../proto/relay_pb";
import { Relayer as RelayerService } from "../proto/relay_pb_service";
import transport from "../util/browser";

class Relayer {
  private activeConsumerSession: SingleConsumerSession;
  private chainID: string;
  private privKey: string;

  constructor(
    consumerSession: SingleConsumerSession,
    chainID: string,
    privKey: string
  ) {
    this.activeConsumerSession = consumerSession;
    this.chainID = chainID;
    this.privKey = privKey;
  }

  setConsumerSession(consumerSession: SingleConsumerSession) {
    this.activeConsumerSession = consumerSession;
  }

  async sendRelay(method: string, params: string[]): Promise<RelayReply> {
    const stringifyMethod = JSON.stringify(method);
    const stringifyParam = JSON.stringify(params);

    // Create relay client

    // Get consumer session
    const consumerSession = this.activeConsumerSession;

    const enc = new TextEncoder();

    const data =
      '{"jsonrpc": "2.0", "id": 1, "method": ' +
      stringifyMethod +
      ', "params": ' +
      stringifyParam +
      "}";

    // Create request
    const request = new RelayRequest();
    request.setChainid(this.chainID);
    request.setConnectionType("");
    request.setApiUrl("");
    request.setSessionId(consumerSession.SessionId);
    request.setCuSum(10);
    request.setSig(new Uint8Array());
    request.setData(data);
    request.setProvider(consumerSession.Account);
    request.setBlockHeight(consumerSession.PairingEpoch);
    request.setRelayNum(consumerSession.RelayNum);
    request.setRequestBlock(0);
    request.setUnresponsiveProviders(new Uint8Array());

    // Sign data
    const signedMessage = await this.signRelay(request, this.privKey);

    // Add signature in the request
    request.setSig(signedMessage);
    request.setData(enc.encode(data));

    const requestPromise = new Promise<RelayReply>((resolve) => {
      grpc.invoke(RelayerService.Relay, {
        request: request,
        host: "http://" + consumerSession.Endpoint.Addr,
        transport: transport,
        onMessage: (message: RelayReply) => {
          resolve(message);
        },
        onEnd: () => {
          // Consider printing response status here, it's optional
        },
      });
    });
    return requestPromise;
  }

  // Sign relay request using priv key
  private async signRelay(
    request: RelayRequest,
    privKey: string
  ): Promise<Uint8Array> {
    const message = this.prepareRequest(request);

    const sig = await Secp256k1.createSignature(message, fromHex(privKey));

    const recovery = sig.recovery;
    const r = sig.r();
    const s = sig.s();

    // TODO consider adding compression in the signing
    // construct signature
    // <(byte of 27+public key solution)>< padded bytes for signature R><padded bytes for signature S>
    return Uint8Array.from([27 + recovery, ...r, ...s]);
  }

  private prepareRequest(request: RelayRequest): Uint8Array {
    const enc = new TextEncoder();

    const jsonMessage = JSON.stringify(request.toObject(), (key, value) => {
      if (value !== null && value !== 0 && value !== "") return value;
    });

    const messageReplaced = jsonMessage
      .replace(/,"/g, ' "')
      .replace(/"(\w+)"\s*:/g, "$1:")
      .slice(1, -1);

    const encodedMessage = enc.encode(messageReplaced + " ");

    const hash = sha256(encodedMessage);

    return hash;
  }
}

export default Relayer;
