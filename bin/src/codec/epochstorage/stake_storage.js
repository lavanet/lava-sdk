"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeStorage = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const stake_entry_1 = require("./stake_entry");
exports.protobufPackage = "lavanet.lava.epochstorage";
function createBaseStakeStorage() {
    return { index: "", stakeEntries: [] };
}
exports.StakeStorage = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.index !== "") {
            writer.uint32(10).string(message.index);
        }
        for (const v of message.stakeEntries) {
            stake_entry_1.StakeEntry.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStakeStorage();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.index = reader.string();
                    break;
                case 2:
                    message.stakeEntries.push(stake_entry_1.StakeEntry.decode(reader, reader.uint32()));
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
            stakeEntries: Array.isArray(object === null || object === void 0 ? void 0 : object.stakeEntries)
                ? object.stakeEntries.map((e) => stake_entry_1.StakeEntry.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.index !== undefined && (obj.index = message.index);
        if (message.stakeEntries) {
            obj.stakeEntries = message.stakeEntries.map((e) => e ? stake_entry_1.StakeEntry.toJSON(e) : undefined);
        }
        else {
            obj.stakeEntries = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseStakeStorage();
        message.index = (_a = object.index) !== null && _a !== void 0 ? _a : "";
        message.stakeEntries = ((_b = object.stakeEntries) === null || _b === void 0 ? void 0 : _b.map((e) => stake_entry_1.StakeEntry.fromPartial(e))) || [];
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
