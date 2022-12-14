"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpochDetails = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "lavanet.lava.epochstorage";
function createBaseEpochDetails() {
    return { startBlock: long_1.default.UZERO, earliestStart: long_1.default.UZERO };
}
exports.EpochDetails = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.startBlock.isZero()) {
            writer.uint32(8).uint64(message.startBlock);
        }
        if (!message.earliestStart.isZero()) {
            writer.uint32(16).uint64(message.earliestStart);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEpochDetails();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.startBlock = reader.uint64();
                    break;
                case 2:
                    message.earliestStart = reader.uint64();
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
            startBlock: isSet(object.startBlock) ? long_1.default.fromValue(object.startBlock) : long_1.default.UZERO,
            earliestStart: isSet(object.earliestStart) ? long_1.default.fromValue(object.earliestStart) : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.startBlock !== undefined && (obj.startBlock = (message.startBlock || long_1.default.UZERO).toString());
        message.earliestStart !== undefined && (obj.earliestStart = (message.earliestStart || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseEpochDetails();
        message.startBlock = (object.startBlock !== undefined && object.startBlock !== null)
            ? long_1.default.fromValue(object.startBlock)
            : long_1.default.UZERO;
        message.earliestStart = (object.earliestStart !== undefined && object.earliestStart !== null)
            ? long_1.default.fromValue(object.earliestStart)
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
