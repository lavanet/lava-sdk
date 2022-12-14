"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "lavanet.lava.pairing";
function createBaseParams() {
    return {
        minStakeProvider: "",
        minStakeClient: "",
        mintCoinsPerCU: "",
        burnCoinsPerCU: "",
        fraudStakeSlashingFactor: "",
        fraudSlashingAmount: long_1.default.UZERO,
        servicersToPairCount: long_1.default.UZERO,
        epochBlocksOverlap: long_1.default.UZERO,
        stakeToMaxCUList: "",
        unpayLimit: "",
        slashLimit: "",
        dataReliabilityReward: "",
        QoSWeight: "",
    };
}
exports.Params = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.minStakeProvider !== "") {
            writer.uint32(10).string(message.minStakeProvider);
        }
        if (message.minStakeClient !== "") {
            writer.uint32(18).string(message.minStakeClient);
        }
        if (message.mintCoinsPerCU !== "") {
            writer.uint32(26).string(message.mintCoinsPerCU);
        }
        if (message.burnCoinsPerCU !== "") {
            writer.uint32(34).string(message.burnCoinsPerCU);
        }
        if (message.fraudStakeSlashingFactor !== "") {
            writer.uint32(42).string(message.fraudStakeSlashingFactor);
        }
        if (!message.fraudSlashingAmount.isZero()) {
            writer.uint32(48).uint64(message.fraudSlashingAmount);
        }
        if (!message.servicersToPairCount.isZero()) {
            writer.uint32(56).uint64(message.servicersToPairCount);
        }
        if (!message.epochBlocksOverlap.isZero()) {
            writer.uint32(64).uint64(message.epochBlocksOverlap);
        }
        if (message.stakeToMaxCUList !== "") {
            writer.uint32(74).string(message.stakeToMaxCUList);
        }
        if (message.unpayLimit !== "") {
            writer.uint32(82).string(message.unpayLimit);
        }
        if (message.slashLimit !== "") {
            writer.uint32(90).string(message.slashLimit);
        }
        if (message.dataReliabilityReward !== "") {
            writer.uint32(98).string(message.dataReliabilityReward);
        }
        if (message.QoSWeight !== "") {
            writer.uint32(106).string(message.QoSWeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.minStakeProvider = reader.string();
                    break;
                case 2:
                    message.minStakeClient = reader.string();
                    break;
                case 3:
                    message.mintCoinsPerCU = reader.string();
                    break;
                case 4:
                    message.burnCoinsPerCU = reader.string();
                    break;
                case 5:
                    message.fraudStakeSlashingFactor = reader.string();
                    break;
                case 6:
                    message.fraudSlashingAmount = reader.uint64();
                    break;
                case 7:
                    message.servicersToPairCount = reader.uint64();
                    break;
                case 8:
                    message.epochBlocksOverlap = reader.uint64();
                    break;
                case 9:
                    message.stakeToMaxCUList = reader.string();
                    break;
                case 10:
                    message.unpayLimit = reader.string();
                    break;
                case 11:
                    message.slashLimit = reader.string();
                    break;
                case 12:
                    message.dataReliabilityReward = reader.string();
                    break;
                case 13:
                    message.QoSWeight = reader.string();
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
            minStakeProvider: isSet(object.minStakeProvider) ? String(object.minStakeProvider) : "",
            minStakeClient: isSet(object.minStakeClient) ? String(object.minStakeClient) : "",
            mintCoinsPerCU: isSet(object.mintCoinsPerCU) ? String(object.mintCoinsPerCU) : "",
            burnCoinsPerCU: isSet(object.burnCoinsPerCU) ? String(object.burnCoinsPerCU) : "",
            fraudStakeSlashingFactor: isSet(object.fraudStakeSlashingFactor) ? String(object.fraudStakeSlashingFactor) : "",
            fraudSlashingAmount: isSet(object.fraudSlashingAmount) ? long_1.default.fromValue(object.fraudSlashingAmount) : long_1.default.UZERO,
            servicersToPairCount: isSet(object.servicersToPairCount)
                ? long_1.default.fromValue(object.servicersToPairCount)
                : long_1.default.UZERO,
            epochBlocksOverlap: isSet(object.epochBlocksOverlap) ? long_1.default.fromValue(object.epochBlocksOverlap) : long_1.default.UZERO,
            stakeToMaxCUList: isSet(object.stakeToMaxCUList) ? String(object.stakeToMaxCUList) : "",
            unpayLimit: isSet(object.unpayLimit) ? String(object.unpayLimit) : "",
            slashLimit: isSet(object.slashLimit) ? String(object.slashLimit) : "",
            dataReliabilityReward: isSet(object.dataReliabilityReward) ? String(object.dataReliabilityReward) : "",
            QoSWeight: isSet(object.QoSWeight) ? String(object.QoSWeight) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.minStakeProvider !== undefined && (obj.minStakeProvider = message.minStakeProvider);
        message.minStakeClient !== undefined && (obj.minStakeClient = message.minStakeClient);
        message.mintCoinsPerCU !== undefined && (obj.mintCoinsPerCU = message.mintCoinsPerCU);
        message.burnCoinsPerCU !== undefined && (obj.burnCoinsPerCU = message.burnCoinsPerCU);
        message.fraudStakeSlashingFactor !== undefined && (obj.fraudStakeSlashingFactor = message.fraudStakeSlashingFactor);
        message.fraudSlashingAmount !== undefined &&
            (obj.fraudSlashingAmount = (message.fraudSlashingAmount || long_1.default.UZERO).toString());
        message.servicersToPairCount !== undefined &&
            (obj.servicersToPairCount = (message.servicersToPairCount || long_1.default.UZERO).toString());
        message.epochBlocksOverlap !== undefined &&
            (obj.epochBlocksOverlap = (message.epochBlocksOverlap || long_1.default.UZERO).toString());
        message.stakeToMaxCUList !== undefined && (obj.stakeToMaxCUList = message.stakeToMaxCUList);
        message.unpayLimit !== undefined && (obj.unpayLimit = message.unpayLimit);
        message.slashLimit !== undefined && (obj.slashLimit = message.slashLimit);
        message.dataReliabilityReward !== undefined && (obj.dataReliabilityReward = message.dataReliabilityReward);
        message.QoSWeight !== undefined && (obj.QoSWeight = message.QoSWeight);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const message = createBaseParams();
        message.minStakeProvider = (_a = object.minStakeProvider) !== null && _a !== void 0 ? _a : "";
        message.minStakeClient = (_b = object.minStakeClient) !== null && _b !== void 0 ? _b : "";
        message.mintCoinsPerCU = (_c = object.mintCoinsPerCU) !== null && _c !== void 0 ? _c : "";
        message.burnCoinsPerCU = (_d = object.burnCoinsPerCU) !== null && _d !== void 0 ? _d : "";
        message.fraudStakeSlashingFactor = (_e = object.fraudStakeSlashingFactor) !== null && _e !== void 0 ? _e : "";
        message.fraudSlashingAmount = (object.fraudSlashingAmount !== undefined && object.fraudSlashingAmount !== null)
            ? long_1.default.fromValue(object.fraudSlashingAmount)
            : long_1.default.UZERO;
        message.servicersToPairCount = (object.servicersToPairCount !== undefined && object.servicersToPairCount !== null)
            ? long_1.default.fromValue(object.servicersToPairCount)
            : long_1.default.UZERO;
        message.epochBlocksOverlap = (object.epochBlocksOverlap !== undefined && object.epochBlocksOverlap !== null)
            ? long_1.default.fromValue(object.epochBlocksOverlap)
            : long_1.default.UZERO;
        message.stakeToMaxCUList = (_f = object.stakeToMaxCUList) !== null && _f !== void 0 ? _f : "";
        message.unpayLimit = (_g = object.unpayLimit) !== null && _g !== void 0 ? _g : "";
        message.slashLimit = (_h = object.slashLimit) !== null && _h !== void 0 ? _h : "";
        message.dataReliabilityReward = (_j = object.dataReliabilityReward) !== null && _j !== void 0 ? _j : "";
        message.QoSWeight = (_k = object.QoSWeight) !== null && _k !== void 0 ? _k : "";
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
