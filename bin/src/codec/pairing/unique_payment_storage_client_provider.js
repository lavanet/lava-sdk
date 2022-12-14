"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniquePaymentStorageClientProvider = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "lavanet.lava.pairing";
function createBaseUniquePaymentStorageClientProvider() {
    return { index: "", block: long_1.default.UZERO, usedCU: long_1.default.UZERO };
}
exports.UniquePaymentStorageClientProvider = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.index !== "") {
            writer.uint32(10).string(message.index);
        }
        if (!message.block.isZero()) {
            writer.uint32(16).uint64(message.block);
        }
        if (!message.usedCU.isZero()) {
            writer.uint32(24).uint64(message.usedCU);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUniquePaymentStorageClientProvider();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.index = reader.string();
                    break;
                case 2:
                    message.block = reader.uint64();
                    break;
                case 3:
                    message.usedCU = reader.uint64();
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
            block: isSet(object.block) ? long_1.default.fromValue(object.block) : long_1.default.UZERO,
            usedCU: isSet(object.usedCU) ? long_1.default.fromValue(object.usedCU) : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.index !== undefined && (obj.index = message.index);
        message.block !== undefined && (obj.block = (message.block || long_1.default.UZERO).toString());
        message.usedCU !== undefined && (obj.usedCU = (message.usedCU || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseUniquePaymentStorageClientProvider();
        message.index = (_a = object.index) !== null && _a !== void 0 ? _a : "";
        message.block = (object.block !== undefined && object.block !== null) ? long_1.default.fromValue(object.block) : long_1.default.UZERO;
        message.usedCU = (object.usedCU !== undefined && object.usedCU !== null)
            ? long_1.default.fromValue(object.usedCU)
            : long_1.default.UZERO;
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
