"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
const grpc_web_1 = require("@improbable-eng/grpc-web");
const relay_pb_1 = require("../proto/relay_pb");
const relay_pb_service_1 = require("../proto/relay_pb_service");
const browser_1 = __importDefault(require("../util/browser"));
class Relayer {
    constructor(chainID, privKey) {
        this.chainID = chainID;
        this.privKey = privKey;
    }
    sendRelay(options, consumerProviderSession, cuSum, apiInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extract attributes from options
            const { data, url, connectionType } = options;
            const enc = new TextEncoder();
            const consumerSession = consumerProviderSession.Session;
            // Increase used compute units
            consumerProviderSession.UsedComputeUnits =
                consumerProviderSession.UsedComputeUnits + cuSum;
            // create request session
            const requestSession = new relay_pb_1.RelaySession();
            requestSession.setSpecid(this.chainID);
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
            const requestPrivateData = new relay_pb_1.RelayPrivateData();
            requestPrivateData.setConnectionType(connectionType);
            requestPrivateData.setApiUrl(url);
            requestPrivateData.setData(enc.encode(data));
            requestPrivateData.setRequestBlock(0);
            requestPrivateData.setApiinterface(apiInterface);
            requestPrivateData.setSalt(new Uint8Array());
            // Create request
            // Sign data
            const signedMessage = yield this.signRelay(requestSession, this.privKey);
            requestSession.setSig(signedMessage);
            var request = new relay_pb_1.RelayRequest();
            request.setRelaySession(requestSession);
            request.setRelayData(requestPrivateData);
            const requestPromise = new Promise((resolve, reject) => {
                grpc_web_1.grpc.invoke(relay_pb_service_1.Relayer.Relay, {
                    request: request,
                    host: "http://" + consumerSession.Endpoint.Addr,
                    transport: browser_1.default,
                    onMessage: (message) => {
                        resolve(message);
                    },
                    onEnd: (code, msg) => {
                        if (code == grpc_web_1.grpc.Code.OK || msg == undefined) {
                            return;
                        }
                        // underflow guard
                        if (consumerProviderSession.UsedComputeUnits > cuSum) {
                            consumerProviderSession.UsedComputeUnits =
                                consumerProviderSession.UsedComputeUnits - cuSum;
                        }
                        else {
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
        });
    }
    // Sign relay request using priv key
    signRelay(request, privKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = this.prepareRequest(request);
            const sig = yield crypto_1.Secp256k1.createSignature(message, (0, encoding_1.fromHex)(privKey));
            const recovery = sig.recovery;
            const r = sig.r(32); // if r is not 32 bytes, add padding
            const s = sig.s(32); // if s is not 32 bytes, add padding
            // TODO consider adding compression in the signing
            // construct signature
            // <(byte of 27+public key solution)>< padded bytes for signature R><padded bytes for signature S>
            return Uint8Array.from([27 + recovery, ...r, ...s]);
        });
    }
    prepareRequest(request) {
        const enc = new TextEncoder();
        const jsonMessage = JSON.stringify(request.toObject(), (key, value) => {
            if (value !== null && value !== 0 && value !== "")
                return value;
        });
        const messageReplaced = jsonMessage
            .replace(/,"/g, ' "')
            .replace(/"(\w+)"\s*:/g, "$1:")
            .slice(1, -1);
        const encodedMessage = enc.encode(messageReplaced + " ");
        const hash = (0, crypto_1.sha256)(encodedMessage);
        return hash;
    }
}
exports.default = Relayer;
