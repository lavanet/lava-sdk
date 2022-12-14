"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictVote_VotersHashEntry = exports.ConflictVote = exports.Vote = exports.Provider = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "lavanet.lava.conflict";
function createBaseProvider() {
    return { account: "", response: new Uint8Array() };
}
exports.Provider = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.account !== "") {
            writer.uint32(10).string(message.account);
        }
        if (message.response.length !== 0) {
            writer.uint32(18).bytes(message.response);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseProvider();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.account = reader.string();
                    break;
                case 2:
                    message.response = reader.bytes();
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
            account: isSet(object.account) ? String(object.account) : "",
            response: isSet(object.response) ? bytesFromBase64(object.response) : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.account !== undefined && (obj.account = message.account);
        message.response !== undefined &&
            (obj.response = base64FromBytes(message.response !== undefined ? message.response : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseProvider();
        message.account = (_a = object.account) !== null && _a !== void 0 ? _a : "";
        message.response = (_b = object.response) !== null && _b !== void 0 ? _b : new Uint8Array();
        return message;
    },
};
function createBaseVote() {
    return { Hash: new Uint8Array(), Result: long_1.default.ZERO };
}
exports.Vote = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.Hash.length !== 0) {
            writer.uint32(10).bytes(message.Hash);
        }
        if (!message.Result.isZero()) {
            writer.uint32(16).int64(message.Result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVote();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Hash = reader.bytes();
                    break;
                case 2:
                    message.Result = reader.int64();
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
            Hash: isSet(object.Hash) ? bytesFromBase64(object.Hash) : new Uint8Array(),
            Result: isSet(object.Result) ? long_1.default.fromValue(object.Result) : long_1.default.ZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.Hash !== undefined &&
            (obj.Hash = base64FromBytes(message.Hash !== undefined ? message.Hash : new Uint8Array()));
        message.Result !== undefined && (obj.Result = (message.Result || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseVote();
        message.Hash = (_a = object.Hash) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.Result = (object.Result !== undefined && object.Result !== null)
            ? long_1.default.fromValue(object.Result)
            : long_1.default.ZERO;
        return message;
    },
};
function createBaseConflictVote() {
    return {
        index: "",
        clientAddress: "",
        voteDeadline: long_1.default.UZERO,
        voteStartBlock: long_1.default.UZERO,
        voteState: long_1.default.ZERO,
        chainID: "",
        apiUrl: "",
        requestData: new Uint8Array(),
        requestBlock: long_1.default.UZERO,
        firstProvider: undefined,
        secondProvider: undefined,
        votersHash: {},
    };
}
exports.ConflictVote = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.index !== "") {
            writer.uint32(10).string(message.index);
        }
        if (message.clientAddress !== "") {
            writer.uint32(18).string(message.clientAddress);
        }
        if (!message.voteDeadline.isZero()) {
            writer.uint32(24).uint64(message.voteDeadline);
        }
        if (!message.voteStartBlock.isZero()) {
            writer.uint32(32).uint64(message.voteStartBlock);
        }
        if (!message.voteState.isZero()) {
            writer.uint32(40).int64(message.voteState);
        }
        if (message.chainID !== "") {
            writer.uint32(50).string(message.chainID);
        }
        if (message.apiUrl !== "") {
            writer.uint32(58).string(message.apiUrl);
        }
        if (message.requestData.length !== 0) {
            writer.uint32(66).bytes(message.requestData);
        }
        if (!message.requestBlock.isZero()) {
            writer.uint32(72).uint64(message.requestBlock);
        }
        if (message.firstProvider !== undefined) {
            exports.Provider.encode(message.firstProvider, writer.uint32(82).fork()).ldelim();
        }
        if (message.secondProvider !== undefined) {
            exports.Provider.encode(message.secondProvider, writer.uint32(90).fork()).ldelim();
        }
        Object.entries(message.votersHash).forEach(([key, value]) => {
            exports.ConflictVote_VotersHashEntry.encode({ key: key, value }, writer.uint32(106).fork()).ldelim();
        });
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConflictVote();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.index = reader.string();
                    break;
                case 2:
                    message.clientAddress = reader.string();
                    break;
                case 3:
                    message.voteDeadline = reader.uint64();
                    break;
                case 4:
                    message.voteStartBlock = reader.uint64();
                    break;
                case 5:
                    message.voteState = reader.int64();
                    break;
                case 6:
                    message.chainID = reader.string();
                    break;
                case 7:
                    message.apiUrl = reader.string();
                    break;
                case 8:
                    message.requestData = reader.bytes();
                    break;
                case 9:
                    message.requestBlock = reader.uint64();
                    break;
                case 10:
                    message.firstProvider = exports.Provider.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.secondProvider = exports.Provider.decode(reader, reader.uint32());
                    break;
                case 13:
                    const entry13 = exports.ConflictVote_VotersHashEntry.decode(reader, reader.uint32());
                    if (entry13.value !== undefined) {
                        message.votersHash[entry13.key] = entry13.value;
                    }
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
            index: isSet(object.index) ? String(object.index) : "",
            clientAddress: isSet(object.clientAddress) ? String(object.clientAddress) : "",
            voteDeadline: isSet(object.voteDeadline) ? long_1.default.fromValue(object.voteDeadline) : long_1.default.UZERO,
            voteStartBlock: isSet(object.voteStartBlock) ? long_1.default.fromValue(object.voteStartBlock) : long_1.default.UZERO,
            voteState: isSet(object.voteState) ? long_1.default.fromValue(object.voteState) : long_1.default.ZERO,
            chainID: isSet(object.chainID) ? String(object.chainID) : "",
            apiUrl: isSet(object.apiUrl) ? String(object.apiUrl) : "",
            requestData: isSet(object.requestData) ? bytesFromBase64(object.requestData) : new Uint8Array(),
            requestBlock: isSet(object.requestBlock) ? long_1.default.fromValue(object.requestBlock) : long_1.default.UZERO,
            firstProvider: isSet(object.firstProvider) ? exports.Provider.fromJSON(object.firstProvider) : undefined,
            secondProvider: isSet(object.secondProvider) ? exports.Provider.fromJSON(object.secondProvider) : undefined,
            votersHash: isObject(object.votersHash)
                ? Object.entries(object.votersHash).reduce((acc, [key, value]) => {
                    acc[key] = exports.Vote.fromJSON(value);
                    return acc;
                }, {})
                : {},
        };
    },
    toJSON(message) {
        const obj = {};
        message.index !== undefined && (obj.index = message.index);
        message.clientAddress !== undefined && (obj.clientAddress = message.clientAddress);
        message.voteDeadline !== undefined && (obj.voteDeadline = (message.voteDeadline || long_1.default.UZERO).toString());
        message.voteStartBlock !== undefined && (obj.voteStartBlock = (message.voteStartBlock || long_1.default.UZERO).toString());
        message.voteState !== undefined && (obj.voteState = (message.voteState || long_1.default.ZERO).toString());
        message.chainID !== undefined && (obj.chainID = message.chainID);
        message.apiUrl !== undefined && (obj.apiUrl = message.apiUrl);
        message.requestData !== undefined &&
            (obj.requestData = base64FromBytes(message.requestData !== undefined ? message.requestData : new Uint8Array()));
        message.requestBlock !== undefined && (obj.requestBlock = (message.requestBlock || long_1.default.UZERO).toString());
        message.firstProvider !== undefined &&
            (obj.firstProvider = message.firstProvider ? exports.Provider.toJSON(message.firstProvider) : undefined);
        message.secondProvider !== undefined &&
            (obj.secondProvider = message.secondProvider ? exports.Provider.toJSON(message.secondProvider) : undefined);
        obj.votersHash = {};
        if (message.votersHash) {
            Object.entries(message.votersHash).forEach(([k, v]) => {
                obj.votersHash[k] = exports.Vote.toJSON(v);
            });
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = createBaseConflictVote();
        message.index = (_a = object.index) !== null && _a !== void 0 ? _a : "";
        message.clientAddress = (_b = object.clientAddress) !== null && _b !== void 0 ? _b : "";
        message.voteDeadline = (object.voteDeadline !== undefined && object.voteDeadline !== null)
            ? long_1.default.fromValue(object.voteDeadline)
            : long_1.default.UZERO;
        message.voteStartBlock = (object.voteStartBlock !== undefined && object.voteStartBlock !== null)
            ? long_1.default.fromValue(object.voteStartBlock)
            : long_1.default.UZERO;
        message.voteState = (object.voteState !== undefined && object.voteState !== null)
            ? long_1.default.fromValue(object.voteState)
            : long_1.default.ZERO;
        message.chainID = (_c = object.chainID) !== null && _c !== void 0 ? _c : "";
        message.apiUrl = (_d = object.apiUrl) !== null && _d !== void 0 ? _d : "";
        message.requestData = (_e = object.requestData) !== null && _e !== void 0 ? _e : new Uint8Array();
        message.requestBlock = (object.requestBlock !== undefined && object.requestBlock !== null)
            ? long_1.default.fromValue(object.requestBlock)
            : long_1.default.UZERO;
        message.firstProvider = (object.firstProvider !== undefined && object.firstProvider !== null)
            ? exports.Provider.fromPartial(object.firstProvider)
            : undefined;
        message.secondProvider = (object.secondProvider !== undefined && object.secondProvider !== null)
            ? exports.Provider.fromPartial(object.secondProvider)
            : undefined;
        message.votersHash = Object.entries((_f = object.votersHash) !== null && _f !== void 0 ? _f : {}).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = exports.Vote.fromPartial(value);
            }
            return acc;
        }, {});
        return message;
    },
};
function createBaseConflictVote_VotersHashEntry() {
    return { key: "", value: undefined };
}
exports.ConflictVote_VotersHashEntry = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== undefined) {
            exports.Vote.encode(message.value, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConflictVote_VotersHashEntry();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.value = exports.Vote.decode(reader, reader.uint32());
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
            key: isSet(object.key) ? String(object.key) : "",
            value: isSet(object.value) ? exports.Vote.fromJSON(object.value) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.key !== undefined && (obj.key = message.key);
        message.value !== undefined && (obj.value = message.value ? exports.Vote.toJSON(message.value) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseConflictVote_VotersHashEntry();
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : "";
        message.value = (object.value !== undefined && object.value !== null) ? exports.Vote.fromPartial(object.value) : undefined;
        return message;
    },
};
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
function isObject(value) {
    return typeof value === "object" && value !== null;
}
function isSet(value) {
    return value !== null && value !== undefined;
}
