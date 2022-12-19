import { ConsumerSessionWithProvider } from "../types/types";
import { Secp256k1, sha256 } from "@cosmjs/crypto";
import { fromHex } from "@cosmjs/encoding";
import { grpc } from "@improbable-eng/grpc-web";
import { RelayRequest, RelayReply } from "../proto/relay_pb";
import { Relayer as RelayerService } from "../proto/relay_pb_service";
import transport from "../util/browser";

class Relayer {
  private chainID: string;
  private privKey: string;

  constructor(chainID: string, privKey: string) {
    this.chainID = chainID;
    this.privKey = privKey;
  }

  async sendRelay(
    options: SendRelayOptions,
    consumerProviderSession: ConsumerSessionWithProvider,
    cuSum: number
  ): Promise<RelayReply> {
    // Extract attributes from options
    const { data, url, connectionType } = options;

    const enc = new TextEncoder();

    const consumerSession = consumerProviderSession.Session;

    // Increase used compute units
    consumerProviderSession.UsedComputeUnits =
      consumerProviderSession.UsedComputeUnits + cuSum;

    // Create request
    const request = new RelayRequest();
    request.setChainid(this.chainID);
    request.setConnectionType(connectionType);
    request.setApiUrl(url);
    request.setSessionId(consumerSession.getNewSessionId());
    request.setCuSum(cuSum);
    request.setSig(new Uint8Array());
    request.setData(data);
    request.setProvider(consumerSession.ProviderAddress);
    request.setBlockHeight(consumerSession.PairingEpoch);
    request.setRelayNum(consumerSession.RelayNum);
    request.setRequestBlock(0);
    request.setUnresponsiveProviders(new Uint8Array());

    // Sign data
    const signedMessage = await this.signRelay(request, this.privKey);

    // Add signature in the request
    request.setSig(signedMessage);
    request.setData(enc.encode(data));

    const requestPromise = new Promise<RelayReply>((resolve, reject) => {
      grpc.invoke(RelayerService.Relay, {
        request: request,
        host: "http://" + consumerSession.Endpoint.Addr,
        transport: transport,
        onMessage: (message: RelayReply) => {
          resolve(message);
        },
        onEnd: (code: grpc.Code, msg: string | undefined) => {
          if (code == grpc.Code.OK || msg == undefined) {
            return;
          }
          // underflow guard
          if (consumerProviderSession.UsedComputeUnits > cuSum) {
            consumerProviderSession.UsedComputeUnits =
              consumerProviderSession.UsedComputeUnits - cuSum;
          } else {
            consumerProviderSession.UsedComputeUnits = 0;
          }

          reject(new Error(msg));
        },
      });
    });
    return requestPromise;
  }

  // Sign relay request using priv key
  async signRelay(request: RelayRequest, privKey: string): Promise<Uint8Array> {
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

  prepareRequest(request: RelayRequest): Uint8Array {
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

/**
 * Options for send relay method.
 */
interface SendRelayOptions {
  data: string;
  url: string;
  connectionType: string;
}

export default Relayer;
