"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelayerClientImpl = exports.VRFData = exports.RelayReply = exports.RelayRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "lavanet.lava.pairing";
function createBaseRelayRequest() {
    return {
        chainID: "",
        connectionType: "",
        apiUrl: "",
        sessionId: long_1.default.UZERO,
        cuSum: long_1.default.UZERO,
        data: new Uint8Array(),
        sig: new Uint8Array(),
        provider: "",
        blockHeight: long_1.default.ZERO,
        relayNum: long_1.default.UZERO,
        requestBlock: long_1.default.ZERO,
        DataReliability: undefined,
        unresponsiveProviders: new Uint8Array(),
    };
}
exports.RelayRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.chainID !== "") {
            writer.uint32(10).string(message.chainID);
        }
        if (message.connectionType !== "") {
            writer.uint32(18).string(message.connectionType);
        }
        if (message.apiUrl !== "") {
            writer.uint32(26).string(message.apiUrl);
        }
        if (!message.sessionId.isZero()) {
            writer.uint32(32).uint64(message.sessionId);
        }
        if (!message.cuSum.isZero()) {
            writer.uint32(40).uint64(message.cuSum);
        }
        if (message.data.length !== 0) {
            writer.uint32(50).bytes(message.data);
        }
        if (message.sig.length !== 0) {
            writer.uint32(58).bytes(message.sig);
        }
        if (message.provider !== "") {
            writer.uint32(66).string(message.provider);
        }
        if (!message.blockHeight.isZero()) {
            writer.uint32(72).int64(message.blockHeight);
        }
        if (!message.relayNum.isZero()) {
            writer.uint32(80).uint64(message.relayNum);
        }
        if (!message.requestBlock.isZero()) {
            writer.uint32(88).int64(message.requestBlock);
        }
        if (message.DataReliability !== undefined) {
            exports.VRFData.encode(message.DataReliability, writer.uint32(98).fork()).ldelim();
        }
        if (message.unresponsiveProviders.length !== 0) {
            writer.uint32(114).bytes(message.unresponsiveProviders);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRelayRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.chainID = reader.string();
                    break;
                case 2:
                    message.connectionType = reader.string();
                    break;
                case 3:
                    message.apiUrl = reader.string();
                    break;
                case 4:
                    message.sessionId = reader.uint64();
                    break;
                case 5:
                    message.cuSum = reader.uint64();
                    break;
                case 6:
                    message.data = reader.bytes();
                    break;
                case 7:
                    message.sig = reader.bytes();
                    break;
                case 8:
                    message.provider = reader.string();
                    break;
                case 9:
                    message.blockHeight = reader.int64();
                    break;
                case 10:
                    message.relayNum = reader.uint64();
                    break;
                case 11:
                    message.requestBlock = reader.int64();
                    break;
                case 12:
                    message.DataReliability = exports.VRFData.decode(reader, reader.uint32());
                    break;
                case 14:
                    message.unresponsiveProviders = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            chainID: isSet(object.chainID) ? String(object.chainID) : "",
            connectionType: isSet(object.connectionType) ? String(object.connectionType) : "",
            apiUrl: isSet(object.apiUrl) ? String(object.apiUrl) : "",
            sessionId: isSet(object.sessionId) ? long_1.default.fromValue(object.sessionId) : long_1.default.UZERO,
            cuSum: isSet(object.cuSum) ? long_1.default.fromValue(object.cuSum) : long_1.default.UZERO,
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
            sig: isSet(object.sig) ? bytesFromBase64(object.sig) : new Uint8Array(),
            provider: isSet(object.provider) ? String(object.provider) : "",
            blockHeight: isSet(object.blockHeight) ? long_1.default.fromValue(object.blockHeight) : long_1.default.ZERO,
            relayNum: isSet(object.relayNum) ? long_1.default.fromValue(object.relayNum) : long_1.default.UZERO,
            requestBlock: isSet(object.requestBlock) ? long_1.default.fromValue(object.requestBlock) : long_1.default.ZERO,
            DataReliability: isSet(object.DataReliability) ? exports.VRFData.fromJSON(object.DataReliability) : undefined,
            unresponsiveProviders: isSet(object.unresponsiveProviders)
                ? bytesFromBase64(object.unresponsiveProviders)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.chainID !== undefined && (obj.chainID = message.chainID);
        message.connectionType !== undefined && (obj.connectionType = message.connectionType);
        message.apiUrl !== undefined && (obj.apiUrl = message.apiUrl);
        message.sessionId !== undefined && (obj.sessionId = (message.sessionId || long_1.default.UZERO).toString());
        message.cuSum !== undefined && (obj.cuSum = (message.cuSum || long_1.default.UZERO).toString());
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.sig !== undefined &&
            (obj.sig = base64FromBytes(message.sig !== undefined ? message.sig : new Uint8Array()));
        message.provider !== undefined && (obj.provider = message.provider);
        message.blockHeight !== undefined && (obj.blockHeight = (message.blockHeight || long_1.default.ZERO).toString());
        message.relayNum !== undefined && (obj.relayNum = (message.relayNum || long_1.default.UZERO).toString());
        message.requestBlock !== undefined && (obj.requestBlock = (message.requestBlock || long_1.default.ZERO).toString());
        message.DataReliability !== undefined &&
            (obj.DataReliability = message.DataReliability ? exports.VRFData.toJSON(message.DataReliability) : undefined);
        message.unresponsiveProviders !== undefined &&
            (obj.unresponsiveProviders = base64FromBytes(message.unresponsiveProviders !== undefined ? message.unresponsiveProviders : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g;
        const message = createBaseRelayRequest();
        message.chainID = (_a = object.chainID) !== null && _a !== void 0 ? _a : "";
        message.connectionType = (_b = object.connectionType) !== null && _b !== void 0 ? _b : "";
        message.apiUrl = (_c = object.apiUrl) !== null && _c !== void 0 ? _c : "";
        message.sessionId = (object.sessionId !== undefined && object.sessionId !== null)
            ? long_1.default.fromValue(object.sessionId)
            : long_1.default.UZERO;
        message.cuSum = (object.cuSum !== undefined && object.cuSum !== null) ? long_1.default.fromValue(object.cuSum) : long_1.default.UZERO;
        message.data = (_d = object.data) !== null && _d !== void 0 ? _d : new Uint8Array();
        message.sig = (_e = object.sig) !== null && _e !== void 0 ? _e : new Uint8Array();
        message.provider = (_f = object.provider) !== null && _f !== void 0 ? _f : "";
        message.blockHeight = (object.blockHeight !== undefined && object.blockHeight !== null)
            ? long_1.default.fromValue(object.blockHeight)
            : long_1.default.ZERO;
        message.relayNum = (object.relayNum !== undefined && object.relayNum !== null)
            ? long_1.default.fromValue(object.relayNum)
            : long_1.default.UZERO;
        message.requestBlock = (object.requestBlock !== undefined && object.requestBlock !== null)
            ? long_1.default.fromValue(object.requestBlock)
            : long_1.default.ZERO;
        message.DataReliability = (object.DataReliability !== undefined && object.DataReliability !== null)
            ? exports.VRFData.fromPartial(object.DataReliability)
            : undefined;
        message.unresponsiveProviders = (_g = object.unresponsiveProviders) !== null && _g !== void 0 ? _g : new Uint8Array();
        return message;
    },
};
function createBaseRelayReply() {
    return {
        data: new Uint8Array(),
        sig: new Uint8Array(),
        nonce: 0,
        latestBlock: long_1.default.ZERO,
        finalizedBlocksHashes: new Uint8Array(),
        sigBlocks: new Uint8Array(),
    };
}
exports.RelayReply = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        if (message.sig.length !== 0) {
            writer.uint32(18).bytes(message.sig);
        }
        if (message.nonce !== 0) {
            writer.uint32(24).uint32(message.nonce);
        }
        if (!message.latestBlock.isZero()) {
            writer.uint32(32).int64(message.latestBlock);
        }
        if (message.finalizedBlocksHashes.length !== 0) {
            writer.uint32(42).bytes(message.finalizedBlocksHashes);
        }
        if (message.sigBlocks.length !== 0) {
            writer.uint32(50).bytes(message.sigBlocks);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRelayReply();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data = reader.bytes();
                    break;
                case 2:
                    message.sig = reader.bytes();
                    break;
                case 3:
                    message.nonce = reader.uint32();
                    break;
                case 4:
                    message.latestBlock = reader.int64();
                    break;
                case 5:
                    message.finalizedBlocksHashes = reader.bytes();
                    break;
                case 6:
                    message.sigBlocks = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
            sig: isSet(object.sig) ? bytesFromBase64(object.sig) : new Uint8Array(),
            nonce: isSet(object.nonce) ? Number(object.nonce) : 0,
            latestBlock: isSet(object.latestBlock) ? long_1.default.fromValue(object.latestBlock) : long_1.default.ZERO,
            finalizedBlocksHashes: isSet(object.finalizedBlocksHashes)
                ? bytesFromBase64(object.finalizedBlocksHashes)
                : new Uint8Array(),
            sigBlocks: isSet(object.sigBlocks) ? bytesFromBase64(object.sigBlocks) : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.sig !== undefined &&
            (obj.sig = base64FromBytes(message.sig !== undefined ? message.sig : new Uint8Array()));
        message.nonce !== undefined && (obj.nonce = Math.round(message.nonce));
        message.latestBlock !== undefined && (obj.latestBlock = (message.latestBlock || long_1.default.ZERO).toString());
        message.finalizedBlocksHashes !== undefined &&
            (obj.finalizedBlocksHashes = base64FromBytes(message.finalizedBlocksHashes !== undefined ? message.finalizedBlocksHashes : new Uint8Array()));
        message.sigBlocks !== undefined &&
            (obj.sigBlocks = base64FromBytes(message.sigBlocks !== undefined ? message.sigBlocks : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseRelayReply();
        message.data = (_a = object.data) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.sig = (_b = object.sig) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.nonce = (_c = object.nonce) !== null && _c !== void 0 ? _c : 0;
        message.latestBlock = (object.latestBlock !== undefined && object.latestBlock !== null)
            ? long_1.default.fromValue(object.latestBlock)
            : long_1.default.ZERO;
        message.finalizedBlocksHashes = (_d = object.finalizedBlocksHashes) !== null && _d !== void 0 ? _d : new Uint8Array();
        message.sigBlocks = (_e = object.sigBlocks) !== null && _e !== void 0 ? _e : new Uint8Array();
        return message;
    },
};
function createBaseVRFData() {
    return {
        differentiator: false,
        vrfValue: new Uint8Array(),
        vrfProof: new Uint8Array(),
        providerSig: new Uint8Array(),
        allDataHash: new Uint8Array(),
        queryHash: new Uint8Array(),
        sig: new Uint8Array(),
    };
}
exports.VRFData = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.differentiator === true) {
            writer.uint32(8).bool(message.differentiator);
        }
        if (message.vrfValue.length !== 0) {
            writer.uint32(18).bytes(message.vrfValue);
        }
        if (message.vrfProof.length !== 0) {
            writer.uint32(26).bytes(message.vrfProof);
        }
        if (message.providerSig.length !== 0) {
            writer.uint32(34).bytes(message.providerSig);
        }
        if (message.allDataHash.length !== 0) {
            writer.uint32(42).bytes(message.allDataHash);
        }
        if (message.queryHash.length !== 0) {
            writer.uint32(50).bytes(message.queryHash);
        }
        if (message.sig.length !== 0) {
            writer.uint32(58).bytes(message.sig);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVRFData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.differentiator = reader.bool();
                    break;
                case 2:
                    message.vrfValue = reader.bytes();
                    break;
                case 3:
                    message.vrfProof = reader.bytes();
                    break;
                case 4:
                    message.providerSig = reader.bytes();
                    break;
                case 5:
                    message.allDataHash = reader.bytes();
                    break;
                case 6:
                    message.queryHash = reader.bytes();
                    break;
                case 7:
                    message.sig = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            differentiator: isSet(object.differentiator) ? Boolean(object.differentiator) : false,
            vrfValue: isSet(object.vrfValue) ? bytesFromBase64(object.vrfValue) : new Uint8Array(),
            vrfProof: isSet(object.vrfProof) ? bytesFromBase64(object.vrfProof) : new Uint8Array(),
            providerSig: isSet(object.providerSig) ? bytesFromBase64(object.providerSig) : new Uint8Array(),
            allDataHash: isSet(object.allDataHash) ? bytesFromBase64(object.allDataHash) : new Uint8Array(),
            queryHash: isSet(object.queryHash) ? bytesFromBase64(object.queryHash) : new Uint8Array(),
            sig: isSet(object.sig) ? bytesFromBase64(object.sig) : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.differentiator !== undefined && (obj.differentiator = message.differentiator);
        message.vrfValue !== undefined &&
            (obj.vrfValue = base64FromBytes(message.vrfValue !== undefined ? message.vrfValue : new Uint8Array()));
        message.vrfProof !== undefined &&
            (obj.vrfProof = base64FromBytes(message.vrfProof !== undefined ? message.vrfProof : new Uint8Array()));
        message.providerSig !== undefined &&
            (obj.providerSig = base64FromBytes(message.providerSig !== undefined ? message.providerSig : new Uint8Array()));
        message.allDataHash !== undefined &&
            (obj.allDataHash = base64FromBytes(message.allDataHash !== undefined ? message.allDataHash : new Uint8Array()));
        message.queryHash !== undefined &&
            (obj.queryHash = base64FromBytes(message.queryHash !== undefined ? message.queryHash : new Uint8Array()));
        message.sig !== undefined &&
            (obj.sig = base64FromBytes(message.sig !== undefined ? message.sig : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g;
        const message = createBaseVRFData();
        message.differentiator = (_a = object.differentiator) !== null && _a !== void 0 ? _a : false;
        message.vrfValue = (_b = object.vrfValue) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.vrfProof = (_c = object.vrfProof) !== null && _c !== void 0 ? _c : new Uint8Array();
        message.providerSig = (_d = object.providerSig) !== null && _d !== void 0 ? _d : new Uint8Array();
        message.allDataHash = (_e = object.allDataHash) !== null && _e !== void 0 ? _e : new Uint8Array();
        message.queryHash = (_f = object.queryHash) !== null && _f !== void 0 ? _f : new Uint8Array();
        message.sig = (_g = object.sig) !== null && _g !== void 0 ? _g : new Uint8Array();
        return message;
    },
};
class RelayerClientImpl {
    constructor(rpc, opts) {
        this.service = (opts === null || opts === void 0 ? void 0 : opts.service) || "lavanet.lava.pairing.Relayer";
        this.rpc = rpc;
        this.Relay = this.Relay.bind(this);
    }
    Relay(request) {
        const data = exports.RelayRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Relay", data);
        return promise.then((data) => exports.RelayReply.decode(new minimal_1.default.Reader(data)));
    }
}
exports.RelayerClientImpl = RelayerClientImpl;
var globalThis = (() => {
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    if (typeof self !== "undefined") {
        return self;
    }
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    throw "Unable to locate global object";
})();
function bytesFromBase64(b64) {
    if (globalThis.Buffer) {
        return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
    }
    else {
        const bin = globalThis.atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
            arr[i] = bin.charCodeAt(i);
        }
        return arr;
    }
}
function base64FromBytes(arr) {
    if (globalThis.Buffer) {
        return globalThis.Buffer.from(arr).toString("base64");
    }
    else {
        const bin = [];
        arr.forEach((byte) => {
            bin.push(String.fromCharCode(byte));
        });
        return globalThis.btoa(bin.join(""));
    }
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
