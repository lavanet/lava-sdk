import { ConsumerSessionWithProvider } from "../types/types";
import { Secp256k1, sha256 } from "@cosmjs/crypto";
import { fromHex } from "@cosmjs/encoding";
import { grpc } from "@improbable-eng/grpc-web";
import {
  RelayRequest,
  RelayReply,
  RelaySession,
  RelayPrivateData,
} from "../pairing/relay_pb";
import { Relayer as RelayerService } from "../pairing/relay_pb_service";
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
    cuSum: number,
    apiInterface: string
  ): Promise<RelayReply> {
    // Extract attributes from options
    const { data, url, connectionType } = options;

    const enc = new TextEncoder();

    const consumerSession = consumerProviderSession.Session;

    // Increase used compute units
    consumerProviderSession.UsedComputeUnits =
      consumerProviderSession.UsedComputeUnits + cuSum;

    // create request session
    const requestSession = new RelaySession();
    requestSession.setSpecId(this.chainID);
    requestSession.setSessionId(consumerSession.getNewSessionId());
    requestSession.setCuSum(cuSum);
    requestSession.setProvider(consumerSession.ProviderAddress);
    requestSession.setRelayNum(consumerSession.RelayNum);
    requestSession.setEpoch(consumerSession.PairingEpoch);
    requestSession.setUnresponsiveProviders(new Uint8Array());
    requestSession.setContentHash(new Uint8Array());
    requestSession.setSig(new Uint8Array());
    requestSession.setLavaChainId("lava");

    // create request private data
    const requestPrivateData = new RelayPrivateData();
    requestPrivateData.setConnectionType(connectionType);
    requestPrivateData.setApiUrl(url);
    requestPrivateData.setData(enc.encode(data));
    requestPrivateData.setRequestBlock(0);
    requestPrivateData.setApiInterface(apiInterface);
    requestPrivateData.setSalt(new Uint8Array());

    // Create request

    // Sign data
    const signedMessage = await this.signRelay(requestSession, this.privKey);

    requestSession.setSig(signedMessage);

    var request = new RelayRequest();
    request.setRelaySession(requestSession);
    request.setRelayData(requestPrivateData);
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

          if (msg.includes("Response closed without headers")) {
            msg =
              msg +
              ", provider iPPORT: " +
              consumerProviderSession.Session.Endpoint.Addr +
              ", provider address: " +
              consumerProviderSession.Session.ProviderAddress;
          }

          reject(new Error(msg));
        },
      });
    });
    return requestPromise;
  }

  // Sign relay request using priv key
  async signRelay(request: RelaySession, privKey: string): Promise<Uint8Array> {
    const message = this.prepareRequest(request);

    const sig = await Secp256k1.createSignature(message, fromHex(privKey));

    const recovery = sig.recovery;
    const r = sig.r(32); // if r is not 32 bytes, add padding
    const s = sig.s(32); // if s is not 32 bytes, add padding

    // TODO consider adding compression in the signing
    // construct signature
    // <(byte of 27+public key solution)>< padded bytes for signature R><padded bytes for signature S>
    return Uint8Array.from([27 + recovery, ...r, ...s]);
  }

  prepareRequest(request: RelaySession): Uint8Array {
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
