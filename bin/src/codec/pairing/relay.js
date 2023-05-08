"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelayerClientImpl = exports.VRFData = exports.RelayReply = exports.Badge = exports.RelayRequest = exports.RelayPrivateData = exports.RelaySession = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const operators_1 = require("rxjs/operators");
exports.protobufPackage = "lavanet.lava.pairing";
function createBaseRelaySession() {
    return {
        specId: "",
        contentHash: new Uint8Array(),
        sessionId: long_1.default.UZERO,
        cuSum: long_1.default.UZERO,
        provider: "",
        relayNum: long_1.default.UZERO,
        epoch: long_1.default.ZERO,
        unresponsiveProviders: new Uint8Array(),
        lavaChainId: "",
        sig: new Uint8Array(),
        badge: undefined,
    };
}
exports.RelaySession = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.specId !== "") {
            writer.uint32(10).string(message.specId);
        }
        if (message.contentHash.length !== 0) {
            writer.uint32(18).bytes(message.contentHash);
        }
        if (!message.sessionId.isZero()) {
            writer.uint32(24).uint64(message.sessionId);
        }
        if (!message.cuSum.isZero()) {
            writer.uint32(32).uint64(message.cuSum);
        }
        if (message.provider !== "") {
            writer.uint32(42).string(message.provider);
        }
        if (!message.relayNum.isZero()) {
            writer.uint32(48).uint64(message.relayNum);
        }
        if (!message.epoch.isZero()) {
            writer.uint32(64).int64(message.epoch);
        }
        if (message.unresponsiveProviders.length !== 0) {
            writer.uint32(74).bytes(message.unresponsiveProviders);
        }
        if (message.lavaChainId !== "") {
            writer.uint32(82).string(message.lavaChainId);
        }
        if (message.sig.length !== 0) {
            writer.uint32(90).bytes(message.sig);
        }
        if (message.badge !== undefined) {
            exports.Badge.encode(message.badge, writer.uint32(98).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRelaySession();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.specId = reader.string();
                    break;
                case 2:
                    message.contentHash = reader.bytes();
                    break;
                case 3:
                    message.sessionId = reader.uint64();
                    break;
                case 4:
                    message.cuSum = reader.uint64();
                    break;
                case 5:
                    message.provider = reader.string();
                    break;
                case 6:
                    message.relayNum = reader.uint64();
                    break;
                case 8:
                    message.epoch = reader.int64();
                    break;
                case 9:
                    message.unresponsiveProviders = reader.bytes();
                    break;
                case 10:
                    message.lavaChainId = reader.string();
                    break;
                case 11:
                    message.sig = reader.bytes();
                    break;
                case 12:
                    message.badge = exports.Badge.decode(reader, reader.uint32());
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
            specId: isSet(object.specId) ? String(object.specId) : "",
            contentHash: isSet(object.contentHash) ? bytesFromBase64(object.contentHash) : new Uint8Array(),
            sessionId: isSet(object.sessionId) ? long_1.default.fromValue(object.sessionId) : long_1.default.UZERO,
            cuSum: isSet(object.cuSum) ? long_1.default.fromValue(object.cuSum) : long_1.default.UZERO,
            provider: isSet(object.provider) ? String(object.provider) : "",
            relayNum: isSet(object.relayNum) ? long_1.default.fromValue(object.relayNum) : long_1.default.UZERO,
            epoch: isSet(object.epoch) ? long_1.default.fromValue(object.epoch) : long_1.default.ZERO,
            unresponsiveProviders: isSet(object.unresponsiveProviders)
                ? bytesFromBase64(object.unresponsiveProviders)
                : new Uint8Array(),
            lavaChainId: isSet(object.lavaChainId) ? String(object.lavaChainId) : "",
            sig: isSet(object.sig) ? bytesFromBase64(object.sig) : new Uint8Array(),
            badge: isSet(object.badge) ? exports.Badge.fromJSON(object.badge) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.specId !== undefined && (obj.specId = message.specId);
        message.contentHash !== undefined &&
            (obj.contentHash = base64FromBytes(message.contentHash !== undefined ? message.contentHash : new Uint8Array()));
        message.sessionId !== undefined && (obj.sessionId = (message.sessionId || long_1.default.UZERO).toString());
        message.cuSum !== undefined && (obj.cuSum = (message.cuSum || long_1.default.UZERO).toString());
        message.provider !== undefined && (obj.provider = message.provider);
        message.relayNum !== undefined && (obj.relayNum = (message.relayNum || long_1.default.UZERO).toString());
        message.epoch !== undefined && (obj.epoch = (message.epoch || long_1.default.ZERO).toString());
        message.unresponsiveProviders !== undefined &&
            (obj.unresponsiveProviders = base64FromBytes(message.unresponsiveProviders !== undefined ? message.unresponsiveProviders : new Uint8Array()));
        message.lavaChainId !== undefined && (obj.lavaChainId = message.lavaChainId);
        message.sig !== undefined &&
            (obj.sig = base64FromBytes(message.sig !== undefined ? message.sig : new Uint8Array()));
        message.badge !== undefined && (obj.badge = message.badge ? exports.Badge.toJSON(message.badge) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = createBaseRelaySession();
        message.specId = (_a = object.specId) !== null && _a !== void 0 ? _a : "";
        message.contentHash = (_b = object.contentHash) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.sessionId = (object.sessionId !== undefined && object.sessionId !== null)
            ? long_1.default.fromValue(object.sessionId)
            : long_1.default.UZERO;
        message.cuSum = (object.cuSum !== undefined && object.cuSum !== null) ? long_1.default.fromValue(object.cuSum) : long_1.default.UZERO;
        message.provider = (_c = object.provider) !== null && _c !== void 0 ? _c : "";
        message.relayNum = (object.relayNum !== undefined && object.relayNum !== null)
            ? long_1.default.fromValue(object.relayNum)
            : long_1.default.UZERO;
        message.epoch = (object.epoch !== undefined && object.epoch !== null) ? long_1.default.fromValue(object.epoch) : long_1.default.ZERO;
        message.unresponsiveProviders = (_d = object.unresponsiveProviders) !== null && _d !== void 0 ? _d : new Uint8Array();
        message.lavaChainId = (_e = object.lavaChainId) !== null && _e !== void 0 ? _e : "";
        message.sig = (_f = object.sig) !== null && _f !== void 0 ? _f : new Uint8Array();
        message.badge = (object.badge !== undefined && object.badge !== null) ? exports.Badge.fromPartial(object.badge) : undefined;
        return message;
    },
};
function createBaseRelayPrivateData() {
    return {
        connectionType: "",
        apiUrl: "",
        data: new Uint8Array(),
        requestBlock: long_1.default.ZERO,
        apiInterface: "",
        salt: new Uint8Array(),
    };
}
exports.RelayPrivateData = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.connectionType !== "") {
            writer.uint32(10).string(message.connectionType);
        }
        if (message.apiUrl !== "") {
            writer.uint32(18).string(message.apiUrl);
        }
        if (message.data.length !== 0) {
            writer.uint32(26).bytes(message.data);
        }
        if (!message.requestBlock.isZero()) {
            writer.uint32(32).int64(message.requestBlock);
        }
        if (message.apiInterface !== "") {
            writer.uint32(42).string(message.apiInterface);
        }
        if (message.salt.length !== 0) {
            writer.uint32(50).bytes(message.salt);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRelayPrivateData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.connectionType = reader.string();
                    break;
                case 2:
                    message.apiUrl = reader.string();
                    break;
                case 3:
                    message.data = reader.bytes();
                    break;
                case 4:
                    message.requestBlock = reader.int64();
                    break;
                case 5:
                    message.apiInterface = reader.string();
                    break;
                case 6:
                    message.salt = reader.bytes();
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
            connectionType: isSet(object.connectionType) ? String(object.connectionType) : "",
            apiUrl: isSet(object.apiUrl) ? String(object.apiUrl) : "",
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
            requestBlock: isSet(object.requestBlock) ? long_1.default.fromValue(object.requestBlock) : long_1.default.ZERO,
            apiInterface: isSet(object.apiInterface) ? String(object.apiInterface) : "",
            salt: isSet(object.salt) ? bytesFromBase64(object.salt) : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.connectionType !== undefined && (obj.connectionType = message.connectionType);
        message.apiUrl !== undefined && (obj.apiUrl = message.apiUrl);
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.requestBlock !== undefined && (obj.requestBlock = (message.requestBlock || long_1.default.ZERO).toString());
        message.apiInterface !== undefined && (obj.apiInterface = message.apiInterface);
        message.salt !== undefined &&
            (obj.salt = base64FromBytes(message.salt !== undefined ? message.salt : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseRelayPrivateData();
        message.connectionType = (_a = object.connectionType) !== null && _a !== void 0 ? _a : "";
        message.apiUrl = (_b = object.apiUrl) !== null && _b !== void 0 ? _b : "";
        message.data = (_c = object.data) !== null && _c !== void 0 ? _c : new Uint8Array();
        message.requestBlock = (object.requestBlock !== undefined && object.requestBlock !== null)
            ? long_1.default.fromValue(object.requestBlock)
            : long_1.default.ZERO;
        message.apiInterface = (_d = object.apiInterface) !== null && _d !== void 0 ? _d : "";
        message.salt = (_e = object.salt) !== null && _e !== void 0 ? _e : new Uint8Array();
        return message;
    },
};
function createBaseRelayRequest() {
    return { relaySession: undefined, relayData: undefined, dataReliability: undefined };
}
exports.RelayRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.relaySession !== undefined) {
            exports.RelaySession.encode(message.relaySession, writer.uint32(10).fork()).ldelim();
        }
        if (message.relayData !== undefined) {
            exports.RelayPrivateData.encode(message.relayData, writer.uint32(18).fork()).ldelim();
        }
        if (message.dataReliability !== undefined) {
            exports.VRFData.encode(message.dataReliability, writer.uint32(26).fork()).ldelim();
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
                    message.relaySession = exports.RelaySession.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.relayData = exports.RelayPrivateData.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.dataReliability = exports.VRFData.decode(reader, reader.uint32());
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
            relaySession: isSet(object.relaySession) ? exports.RelaySession.fromJSON(object.relaySession) : undefined,
            relayData: isSet(object.relayData) ? exports.RelayPrivateData.fromJSON(object.relayData) : undefined,
            dataReliability: isSet(object.dataReliability) ? exports.VRFData.fromJSON(object.dataReliability) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.relaySession !== undefined &&
            (obj.relaySession = message.relaySession ? exports.RelaySession.toJSON(message.relaySession) : undefined);
        message.relayData !== undefined &&
            (obj.relayData = message.relayData ? exports.RelayPrivateData.toJSON(message.relayData) : undefined);
        message.dataReliability !== undefined &&
            (obj.dataReliability = message.dataReliability ? exports.VRFData.toJSON(message.dataReliability) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseRelayRequest();
        message.relaySession = (object.relaySession !== undefined && object.relaySession !== null)
            ? exports.RelaySession.fromPartial(object.relaySession)
            : undefined;
        message.relayData = (object.relayData !== undefined && object.relayData !== null)
            ? exports.RelayPrivateData.fromPartial(object.relayData)
            : undefined;
        message.dataReliability = (object.dataReliability !== undefined && object.dataReliability !== null)
            ? exports.VRFData.fromPartial(object.dataReliability)
            : undefined;
        return message;
    },
};
function createBaseBadge() {
    return {
        cuAllocation: long_1.default.UZERO,
        epoch: long_1.default.ZERO,
        badgePk: new Uint8Array(),
        specId: "",
        projectSig: new Uint8Array(),
    };
}
exports.Badge = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.cuAllocation.isZero()) {
            writer.uint32(8).uint64(message.cuAllocation);
        }
        if (!message.epoch.isZero()) {
            writer.uint32(16).int64(message.epoch);
        }
        if (message.badgePk.length !== 0) {
            writer.uint32(26).bytes(message.badgePk);
        }
        if (message.specId !== "") {
            writer.uint32(34).string(message.specId);
        }
        if (message.projectSig.length !== 0) {
            writer.uint32(42).bytes(message.projectSig);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBadge();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.cuAllocation = reader.uint64();
                    break;
                case 2:
                    message.epoch = reader.int64();
                    break;
                case 3:
                    message.badgePk = reader.bytes();
                    break;
                case 4:
                    message.specId = reader.string();
                    break;
                case 5:
                    message.projectSig = reader.bytes();
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
            cuAllocation: isSet(object.cuAllocation) ? long_1.default.fromValue(object.cuAllocation) : long_1.default.UZERO,
            epoch: isSet(object.epoch) ? long_1.default.fromValue(object.epoch) : long_1.default.ZERO,
            badgePk: isSet(object.badgePk) ? bytesFromBase64(object.badgePk) : new Uint8Array(),
            specId: isSet(object.specId) ? String(object.specId) : "",
            projectSig: isSet(object.projectSig) ? bytesFromBase64(object.projectSig) : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.cuAllocation !== undefined && (obj.cuAllocation = (message.cuAllocation || long_1.default.UZERO).toString());
        message.epoch !== undefined && (obj.epoch = (message.epoch || long_1.default.ZERO).toString());
        message.badgePk !== undefined &&
            (obj.badgePk = base64FromBytes(message.badgePk !== undefined ? message.badgePk : new Uint8Array()));
        message.specId !== undefined && (obj.specId = message.specId);
        message.projectSig !== undefined &&
            (obj.projectSig = base64FromBytes(message.projectSig !== undefined ? message.projectSig : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseBadge();
        message.cuAllocation = (object.cuAllocation !== undefined && object.cuAllocation !== null)
            ? long_1.default.fromValue(object.cuAllocation)
            : long_1.default.UZERO;
        message.epoch = (object.epoch !== undefined && object.epoch !== null) ? long_1.default.fromValue(object.epoch) : long_1.default.ZERO;
        message.badgePk = (_a = object.badgePk) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.specId = (_b = object.specId) !== null && _b !== void 0 ? _b : "";
        message.projectSig = (_c = object.projectSig) !== null && _c !== void 0 ? _c : new Uint8Array();
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
        chainId: "",
        epoch: long_1.default.ZERO,
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
        if (message.chainId !== "") {
            writer.uint32(10).string(message.chainId);
        }
        if (!message.epoch.isZero()) {
            writer.uint32(16).int64(message.epoch);
        }
        if (message.differentiator === true) {
            writer.uint32(24).bool(message.differentiator);
        }
        if (message.vrfValue.length !== 0) {
            writer.uint32(34).bytes(message.vrfValue);
        }
        if (message.vrfProof.length !== 0) {
            writer.uint32(42).bytes(message.vrfProof);
        }
        if (message.providerSig.length !== 0) {
            writer.uint32(50).bytes(message.providerSig);
        }
        if (message.allDataHash.length !== 0) {
            writer.uint32(58).bytes(message.allDataHash);
        }
        if (message.queryHash.length !== 0) {
            writer.uint32(66).bytes(message.queryHash);
        }
        if (message.sig.length !== 0) {
            writer.uint32(74).bytes(message.sig);
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
                    message.chainId = reader.string();
                    break;
                case 2:
                    message.epoch = reader.int64();
                    break;
                case 3:
                    message.differentiator = reader.bool();
                    break;
                case 4:
                    message.vrfValue = reader.bytes();
                    break;
                case 5:
                    message.vrfProof = reader.bytes();
                    break;
                case 6:
                    message.providerSig = reader.bytes();
                    break;
                case 7:
                    message.allDataHash = reader.bytes();
                    break;
                case 8:
                    message.queryHash = reader.bytes();
                    break;
                case 9:
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
            chainId: isSet(object.chainId) ? String(object.chainId) : "",
            epoch: isSet(object.epoch) ? long_1.default.fromValue(object.epoch) : long_1.default.ZERO,
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
        message.chainId !== undefined && (obj.chainId = message.chainId);
        message.epoch !== undefined && (obj.epoch = (message.epoch || long_1.default.ZERO).toString());
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
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const message = createBaseVRFData();
        message.chainId = (_a = object.chainId) !== null && _a !== void 0 ? _a : "";
        message.epoch = (object.epoch !== undefined && object.epoch !== null) ? long_1.default.fromValue(object.epoch) : long_1.default.ZERO;
        message.differentiator = (_b = object.differentiator) !== null && _b !== void 0 ? _b : false;
        message.vrfValue = (_c = object.vrfValue) !== null && _c !== void 0 ? _c : new Uint8Array();
        message.vrfProof = (_d = object.vrfProof) !== null && _d !== void 0 ? _d : new Uint8Array();
        message.providerSig = (_e = object.providerSig) !== null && _e !== void 0 ? _e : new Uint8Array();
        message.allDataHash = (_f = object.allDataHash) !== null && _f !== void 0 ? _f : new Uint8Array();
        message.queryHash = (_g = object.queryHash) !== null && _g !== void 0 ? _g : new Uint8Array();
        message.sig = (_h = object.sig) !== null && _h !== void 0 ? _h : new Uint8Array();
        return message;
    },
};
class RelayerClientImpl {
    constructor(rpc, opts) {
        this.service = (opts === null || opts === void 0 ? void 0 : opts.service) || "lavanet.lava.pairing.Relayer";
        this.rpc = rpc;
        this.Relay = this.Relay.bind(this);
        this.RelaySubscribe = this.RelaySubscribe.bind(this);
    }
    Relay(request) {
        const data = exports.RelayRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Relay", data);
        return promise.then((data) => exports.RelayReply.decode(new minimal_1.default.Reader(data)));
    }
    RelaySubscribe(request) {
        const data = exports.RelayRequest.encode(request).finish();
        const result = this.rpc.serverStreamingRequest(this.service, "RelaySubscribe", data);
        return result.pipe((0, operators_1.map)((data) => exports.RelayReply.decode(new minimal_1.default.Reader(data))));
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
