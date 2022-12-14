"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderPaymentStorage = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const unique_payment_storage_client_provider_1 = require("./unique_payment_storage_client_provider");
exports.protobufPackage = "lavanet.lava.pairing";
function createBaseProviderPaymentStorage() {
    return { index: "", uniquePaymentStorageClientProvider: [], epoch: long_1.default.UZERO, unresponsivenessComplaints: [] };
}
exports.ProviderPaymentStorage = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.index !== "") {
            writer.uint32(10).string(message.index);
        }
        for (const v of message.uniquePaymentStorageClientProvider) {
            unique_payment_storage_client_provider_1.UniquePaymentStorageClientProvider.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (!message.epoch.isZero()) {
            writer.uint32(24).uint64(message.epoch);
        }
        for (const v of message.unresponsivenessComplaints) {
            writer.uint32(34).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseProviderPaymentStorage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.index = reader.string();
                    break;
                case 2:
                    message.uniquePaymentStorageClientProvider.push(unique_payment_storage_client_provider_1.UniquePaymentStorageClientProvider.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.epoch = reader.uint64();
                    break;
                case 4:
                    message.unresponsivenessComplaints.push(reader.string());
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
            uniquePaymentStorageClientProvider: Array.isArray(object === null || object === void 0 ? void 0 : object.uniquePaymentStorageClientProvider)
                ? object.uniquePaymentStorageClientProvider.map((e) => unique_payment_storage_client_provider_1.UniquePaymentStorageClientProvider.fromJSON(e))
                : [],
            epoch: isSet(object.epoch) ? long_1.default.fromValue(object.epoch) : long_1.default.UZERO,
            unresponsivenessComplaints: Array.isArray(object === null || object === void 0 ? void 0 : object.unresponsivenessComplaints)
                ? object.unresponsivenessComplaints.map((e) => String(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.index !== undefined && (obj.index = message.index);
        if (message.uniquePaymentStorageClientProvider) {
            obj.uniquePaymentStorageClientProvider = message.uniquePaymentStorageClientProvider.map((e) => e ? unique_payment_storage_client_provider_1.UniquePaymentStorageClientProvider.toJSON(e) : undefined);
        }
        else {
            obj.uniquePaymentStorageClientProvider = [];
        }
        message.epoch !== undefined && (obj.epoch = (message.epoch || long_1.default.UZERO).toString());
        if (message.unresponsivenessComplaints) {
            obj.unresponsivenessComplaints = message.unresponsivenessComplaints.map((e) => e);
        }
        else {
            obj.unresponsivenessComplaints = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseProviderPaymentStorage();
        message.index = (_a = object.index) !== null && _a !== void 0 ? _a : "";
        message.uniquePaymentStorageClientProvider =
            ((_b = object.uniquePaymentStorageClientProvider) === null || _b === void 0 ? void 0 : _b.map((e) => unique_payment_storage_client_provider_1.UniquePaymentStorageClientProvider.fromPartial(e))) || [];
        message.epoch = (object.epoch !== undefined && object.epoch !== null) ? long_1.default.fromValue(object.epoch) : long_1.default.UZERO;
        message.unresponsivenessComplaints = ((_c = object.unresponsivenessComplaints) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
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
