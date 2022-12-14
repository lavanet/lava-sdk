"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeEntry = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const coin_1 = require("../cosmos/base/v1beta1/coin");
const endpoint_1 = require("./endpoint");
exports.protobufPackage = "lavanet.lava.epochstorage";
function createBaseStakeEntry() {
    return {
        stake: undefined,
        address: "",
        deadline: long_1.default.UZERO,
        endpoints: [],
        geolocation: long_1.default.UZERO,
        chain: "",
        vrfpk: "",
    };
}
exports.StakeEntry = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.stake !== undefined) {
            coin_1.Coin.encode(message.stake, writer.uint32(10).fork()).ldelim();
        }
        if (message.address !== "") {
            writer.uint32(18).string(message.address);
        }
        if (!message.deadline.isZero()) {
            writer.uint32(24).uint64(message.deadline);
        }
        for (const v of message.endpoints) {
            endpoint_1.Endpoint.encode(v, writer.uint32(34).fork()).ldelim();
        }
        if (!message.geolocation.isZero()) {
            writer.uint32(40).uint64(message.geolocation);
        }
        if (message.chain !== "") {
            writer.uint32(50).string(message.chain);
        }
        if (message.vrfpk !== "") {
            writer.uint32(58).string(message.vrfpk);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStakeEntry();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.stake = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.address = reader.string();
                    break;
                case 3:
                    message.deadline = reader.uint64();
                    break;
                case 4:
                    message.endpoints.push(endpoint_1.Endpoint.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.geolocation = reader.uint64();
                    break;
                case 6:
                    message.chain = reader.string();
                    break;
                case 7:
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
            stake: isSet(object.stake) ? coin_1.Coin.fromJSON(object.stake) : undefined,
            address: isSet(object.address) ? String(object.address) : "",
            deadline: isSet(object.deadline) ? long_1.default.fromValue(object.deadline) : long_1.default.UZERO,
            endpoints: Array.isArray(object === null || object === void 0 ? void 0 : object.endpoints) ? object.endpoints.map((e) => endpoint_1.Endpoint.fromJSON(e)) : [],
            geolocation: isSet(object.geolocation) ? long_1.default.fromValue(object.geolocation) : long_1.default.UZERO,
            chain: isSet(object.chain) ? String(object.chain) : "",
            vrfpk: isSet(object.vrfpk) ? String(object.vrfpk) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.stake !== undefined && (obj.stake = message.stake ? coin_1.Coin.toJSON(message.stake) : undefined);
        message.address !== undefined && (obj.address = message.address);
        message.deadline !== undefined && (obj.deadline = (message.deadline || long_1.default.UZERO).toString());
        if (message.endpoints) {
            obj.endpoints = message.endpoints.map((e) => e ? endpoint_1.Endpoint.toJSON(e) : undefined);
        }
        else {
            obj.endpoints = [];
        }
        message.geolocation !== undefined && (obj.geolocation = (message.geolocation || long_1.default.UZERO).toString());
        message.chain !== undefined && (obj.chain = message.chain);
        message.vrfpk !== undefined && (obj.vrfpk = message.vrfpk);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseStakeEntry();
        message.stake = (object.stake !== undefined && object.stake !== null) ? coin_1.Coin.fromPartial(object.stake) : undefined;
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : "";
        message.deadline = (object.deadline !== undefined && object.deadline !== null)
            ? long_1.default.fromValue(object.deadline)
            : long_1.default.UZERO;
        message.endpoints = ((_b = object.endpoints) === null || _b === void 0 ? void 0 : _b.map((e) => endpoint_1.Endpoint.fromPartial(e))) || [];
        message.geolocation = (object.geolocation !== undefined && object.geolocation !== null)
            ? long_1.default.fromValue(object.geolocation)
            : long_1.default.UZERO;
        message.chain = (_c = object.chain) !== null && _c !== void 0 ? _c : "";
        message.vrfpk = (_d = object.vrfpk) !== null && _d !== void 0 ? _d : "";
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
