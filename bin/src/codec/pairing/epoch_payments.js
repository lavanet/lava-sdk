"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpochPayments = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const provider_payment_storage_1 = require("./provider_payment_storage");
exports.protobufPackage = "lavanet.lava.pairing";
function createBaseEpochPayments() {
    return { index: "", clientsPayments: [] };
}
exports.EpochPayments = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.index !== "") {
            writer.uint32(10).string(message.index);
        }
        for (const v of message.clientsPayments) {
            provider_payment_storage_1.ProviderPaymentStorage.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEpochPayments();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.index = reader.string();
                    break;
                case 2:
                    message.clientsPayments.push(provider_payment_storage_1.ProviderPaymentStorage.decode(reader, reader.uint32()));
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
            clientsPayments: Array.isArray(object === null || object === void 0 ? void 0 : object.clientsPayments)
                ? object.clientsPayments.map((e) => provider_payment_storage_1.ProviderPaymentStorage.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.index !== undefined && (obj.index = message.index);
        if (message.clientsPayments) {
            obj.clientsPayments = message.clientsPayments.map((e) => e ? provider_payment_storage_1.ProviderPaymentStorage.toJSON(e) : undefined);
        }
        else {
            obj.clientsPayments = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseEpochPayments();
        message.index = (_a = object.index) !== null && _a !== void 0 ? _a : "";
        message.clientsPayments = ((_b = object.clientsPayments) === null || _b === void 0 ? void 0 : _b.map((e) => provider_payment_storage_1.ProviderPaymentStorage.fromPartial(e))) || [];
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
