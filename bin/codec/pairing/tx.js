"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClientImpl = exports.MsgRelayPaymentResponse = exports.MsgRelayPayment = exports.MsgUnstakeClientResponse = exports.MsgUnstakeClient = exports.MsgUnstakeProviderResponse = exports.MsgUnstakeProvider = exports.MsgStakeClientResponse = exports.MsgStakeClient = exports.MsgStakeProviderResponse = exports.MsgStakeProvider = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const coin_1 = require("../cosmos/base/v1beta1/coin");
const endpoint_1 = require("../epochstorage/endpoint");
const relay_1 = require("./relay");
exports.protobufPackage = "lavanet.lava.pairing";
function createBaseMsgStakeProvider() {
    return { creator: "", chainID: "", amount: undefined, endpoints: [], geolocation: long_1.default.UZERO };
}
exports.MsgStakeProvider = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.chainID !== "") {
            writer.uint32(18).string(message.chainID);
        }
        if (message.amount !== undefined) {
            coin_1.Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.endpoints) {
            endpoint_1.Endpoint.encode(v, writer.uint32(34).fork()).ldelim();
        }
        if (!message.geolocation.isZero()) {
            writer.uint32(40).uint64(message.geolocation);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgStakeProvider();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.chainID = reader.string();
                    break;
                case 3:
                    message.amount = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.endpoints.push(endpoint_1.Endpoint.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.geolocation = reader.uint64();
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            chainID: isSet(object.chainID) ? String(object.chainID) : "",
            amount: isSet(object.amount) ? coin_1.Coin.fromJSON(object.amount) : undefined,
            endpoints: Array.isArray(object === null || object === void 0 ? void 0 : object.endpoints) ? object.endpoints.map((e) => endpoint_1.Endpoint.fromJSON(e)) : [],
            geolocation: isSet(object.geolocation) ? long_1.default.fromValue(object.geolocation) : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.chainID !== undefined && (obj.chainID = message.chainID);
        message.amount !== undefined && (obj.amount = message.amount ? coin_1.Coin.toJSON(message.amount) : undefined);
        if (message.endpoints) {
            obj.endpoints = message.endpoints.map((e) => e ? endpoint_1.Endpoint.toJSON(e) : undefined);
        }
        else {
            obj.endpoints = [];
        }
        message.geolocation !== undefined && (obj.geolocation = (message.geolocation || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMsgStakeProvider();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.chainID = (_b = object.chainID) !== null && _b !== void 0 ? _b : "";
        message.amount = (object.amount !== undefined && object.amount !== null)
            ? coin_1.Coin.fromPartial(object.amount)
            : undefined;
        message.endpoints = ((_c = object.endpoints) === null || _c === void 0 ? void 0 : _c.map((e) => endpoint_1.Endpoint.fromPartial(e))) || [];
        message.geolocation = (object.geolocation !== undefined && object.geolocation !== null)
            ? long_1.default.fromValue(object.geolocation)
            : long_1.default.UZERO;
        return message;
    },
};
function createBaseMsgStakeProviderResponse() {
    return {};
}
exports.MsgStakeProviderResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgStakeProviderResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgStakeProviderResponse();
        return message;
    },
};
function createBaseMsgStakeClient() {
    return { creator: "", chainID: "", amount: undefined, geolocation: long_1.default.UZERO, vrfpk: "" };
}
exports.MsgStakeClient = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.chainID !== "") {
            writer.uint32(18).string(message.chainID);
        }
        if (message.amount !== undefined) {
            coin_1.Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
        }
        if (!message.geolocation.isZero()) {
            writer.uint32(32).uint64(message.geolocation);
        }
        if (message.vrfpk !== "") {
            writer.uint32(42).string(message.vrfpk);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgStakeClient();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.chainID = reader.string();
                    break;
                case 3:
                    message.amount = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.geolocation = reader.uint64();
                    break;
                case 5:
                    message.vrfpk = reader.string();
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            chainID: isSet(object.chainID) ? String(object.chainID) : "",
            amount: isSet(object.amount) ? coin_1.Coin.fromJSON(object.amount) : undefined,
            geolocation: isSet(object.geolocation) ? long_1.default.fromValue(object.geolocation) : long_1.default.UZERO,
            vrfpk: isSet(object.vrfpk) ? String(object.vrfpk) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.chainID !== undefined && (obj.chainID = message.chainID);
        message.amount !== undefined && (obj.amount = message.amount ? coin_1.Coin.toJSON(message.amount) : undefined);
        message.geolocation !== undefined && (obj.geolocation = (message.geolocation || long_1.default.UZERO).toString());
        message.vrfpk !== undefined && (obj.vrfpk = message.vrfpk);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMsgStakeClient();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.chainID = (_b = object.chainID) !== null && _b !== void 0 ? _b : "";
        message.amount = (object.amount !== undefined && object.amount !== null)
            ? coin_1.Coin.fromPartial(object.amount)
            : undefined;
        message.geolocation = (object.geolocation !== undefined && object.geolocation !== null)
            ? long_1.default.fromValue(object.geolocation)
            : long_1.default.UZERO;
        message.vrfpk = (_c = object.vrfpk) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseMsgStakeClientResponse() {
    return {};
}
exports.MsgStakeClientResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgStakeClientResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgStakeClientResponse();
        return message;
    },
};
function createBaseMsgUnstakeProvider() {
    return { creator: "", chainID: "" };
}
exports.MsgUnstakeProvider = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.chainID !== "") {
            writer.uint32(18).string(message.chainID);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUnstakeProvider();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.chainID = reader.string();
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            chainID: isSet(object.chainID) ? String(object.chainID) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.chainID !== undefined && (obj.chainID = message.chainID);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgUnstakeProvider();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.chainID = (_b = object.chainID) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseMsgUnstakeProviderResponse() {
    return {};
}
exports.MsgUnstakeProviderResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUnstakeProviderResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgUnstakeProviderResponse();
        return message;
    },
};
function createBaseMsgUnstakeClient() {
    return { creator: "", chainID: "" };
}
exports.MsgUnstakeClient = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.chainID !== "") {
            writer.uint32(18).string(message.chainID);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUnstakeClient();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.chainID = reader.string();
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            chainID: isSet(object.chainID) ? String(object.chainID) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.chainID !== undefined && (obj.chainID = message.chainID);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgUnstakeClient();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.chainID = (_b = object.chainID) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseMsgUnstakeClientResponse() {
    return {};
}
exports.MsgUnstakeClientResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUnstakeClientResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgUnstakeClientResponse();
        return message;
    },
};
function createBaseMsgRelayPayment() {
    return { creator: "", relays: [], descriptionString: "" };
}
exports.MsgRelayPayment = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        for (const v of message.relays) {
            relay_1.RelayRequest.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.descriptionString !== "") {
            writer.uint32(26).string(message.descriptionString);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRelayPayment();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.relays.push(relay_1.RelayRequest.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.descriptionString = reader.string();
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            relays: Array.isArray(object === null || object === void 0 ? void 0 : object.relays) ? object.relays.map((e) => relay_1.RelayRequest.fromJSON(e)) : [],
            descriptionString: isSet(object.descriptionString) ? String(object.descriptionString) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        if (message.relays) {
            obj.relays = message.relays.map((e) => e ? relay_1.RelayRequest.toJSON(e) : undefined);
        }
        else {
            obj.relays = [];
        }
        message.descriptionString !== undefined && (obj.descriptionString = message.descriptionString);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMsgRelayPayment();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.relays = ((_b = object.relays) === null || _b === void 0 ? void 0 : _b.map((e) => relay_1.RelayRequest.fromPartial(e))) || [];
        message.descriptionString = (_c = object.descriptionString) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseMsgRelayPaymentResponse() {
    return {};
}
exports.MsgRelayPaymentResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRelayPaymentResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgRelayPaymentResponse();
        return message;
    },
};
class MsgClientImpl {
    constructor(rpc, opts) {
        this.service = (opts === null || opts === void 0 ? void 0 : opts.service) || "lavanet.lava.pairing.Msg";
        this.rpc = rpc;
        this.StakeProvider = this.StakeProvider.bind(this);
        this.StakeClient = this.StakeClient.bind(this);
        this.UnstakeProvider = this.UnstakeProvider.bind(this);
        this.UnstakeClient = this.UnstakeClient.bind(this);
        this.RelayPayment = this.RelayPayment.bind(this);
    }
    StakeProvider(request) {
        const data = exports.MsgStakeProvider.encode(request).finish();
        const promise = this.rpc.request(this.service, "StakeProvider", data);
        return promise.then((data) => exports.MsgStakeProviderResponse.decode(new minimal_1.default.Reader(data)));
    }
    StakeClient(request) {
        const data = exports.MsgStakeClient.encode(request).finish();
        const promise = this.rpc.request(this.service, "StakeClient", data);
        return promise.then((data) => exports.MsgStakeClientResponse.decode(new minimal_1.default.Reader(data)));
    }
    UnstakeProvider(request) {
        const data = exports.MsgUnstakeProvider.encode(request).finish();
        const promise = this.rpc.request(this.service, "UnstakeProvider", data);
        return promise.then((data) => exports.MsgUnstakeProviderResponse.decode(new minimal_1.default.Reader(data)));
    }
    UnstakeClient(request) {
        const data = exports.MsgUnstakeClient.encode(request).finish();
        const promise = this.rpc.request(this.service, "UnstakeClient", data);
        return promise.then((data) => exports.MsgUnstakeClientResponse.decode(new minimal_1.default.Reader(data)));
    }
    RelayPayment(request) {
        const data = exports.MsgRelayPayment.encode(request).finish();
        const promise = this.rpc.request(this.service, "RelayPayment", data);
        return promise.then((data) => exports.MsgRelayPaymentResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
