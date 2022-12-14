"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spec = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const service_api_1 = require("./service_api");
exports.protobufPackage = "lavanet.lava.spec";
function createBaseSpec() {
    return {
        index: "",
        name: "",
        apis: [],
        enabled: false,
        reliabilityThreshold: 0,
        comparesHashes: false,
        finalizationCriteria: 0,
        savedBlocks: 0,
        averageBlockTime: long_1.default.ZERO,
        allowedBlockLagForQosSync: long_1.default.ZERO,
        blockLastUpdated: long_1.default.UZERO,
    };
}
exports.Spec = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.index !== "") {
            writer.uint32(10).string(message.index);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        for (const v of message.apis) {
            service_api_1.ServiceApi.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.enabled === true) {
            writer.uint32(32).bool(message.enabled);
        }
        if (message.reliabilityThreshold !== 0) {
            writer.uint32(40).uint32(message.reliabilityThreshold);
        }
        if (message.comparesHashes === true) {
            writer.uint32(48).bool(message.comparesHashes);
        }
        if (message.finalizationCriteria !== 0) {
            writer.uint32(56).uint32(message.finalizationCriteria);
        }
        if (message.savedBlocks !== 0) {
            writer.uint32(64).uint32(message.savedBlocks);
        }
        if (!message.averageBlockTime.isZero()) {
            writer.uint32(72).int64(message.averageBlockTime);
        }
        if (!message.allowedBlockLagForQosSync.isZero()) {
            writer.uint32(80).int64(message.allowedBlockLagForQosSync);
        }
        if (!message.blockLastUpdated.isZero()) {
            writer.uint32(88).uint64(message.blockLastUpdated);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSpec();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.index = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.apis.push(service_api_1.ServiceApi.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.enabled = reader.bool();
                    break;
                case 5:
                    message.reliabilityThreshold = reader.uint32();
                    break;
                case 6:
                    message.comparesHashes = reader.bool();
                    break;
                case 7:
                    message.finalizationCriteria = reader.uint32();
                    break;
                case 8:
                    message.savedBlocks = reader.uint32();
                    break;
                case 9:
                    message.averageBlockTime = reader.int64();
                    break;
                case 10:
                    message.allowedBlockLagForQosSync = reader.int64();
                    break;
                case 11:
                    message.blockLastUpdated = reader.uint64();
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
            name: isSet(object.name) ? String(object.name) : "",
            apis: Array.isArray(object === null || object === void 0 ? void 0 : object.apis) ? object.apis.map((e) => service_api_1.ServiceApi.fromJSON(e)) : [],
            enabled: isSet(object.enabled) ? Boolean(object.enabled) : false,
            reliabilityThreshold: isSet(object.reliabilityThreshold) ? Number(object.reliabilityThreshold) : 0,
            comparesHashes: isSet(object.comparesHashes) ? Boolean(object.comparesHashes) : false,
            finalizationCriteria: isSet(object.finalizationCriteria) ? Number(object.finalizationCriteria) : 0,
            savedBlocks: isSet(object.savedBlocks) ? Number(object.savedBlocks) : 0,
            averageBlockTime: isSet(object.averageBlockTime) ? long_1.default.fromValue(object.averageBlockTime) : long_1.default.ZERO,
            allowedBlockLagForQosSync: isSet(object.allowedBlockLagForQosSync)
                ? long_1.default.fromValue(object.allowedBlockLagForQosSync)
                : long_1.default.ZERO,
            blockLastUpdated: isSet(object.blockLastUpdated) ? long_1.default.fromValue(object.blockLastUpdated) : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.index !== undefined && (obj.index = message.index);
        message.name !== undefined && (obj.name = message.name);
        if (message.apis) {
            obj.apis = message.apis.map((e) => e ? service_api_1.ServiceApi.toJSON(e) : undefined);
        }
        else {
            obj.apis = [];
        }
        message.enabled !== undefined && (obj.enabled = message.enabled);
        message.reliabilityThreshold !== undefined && (obj.reliabilityThreshold = Math.round(message.reliabilityThreshold));
        message.comparesHashes !== undefined && (obj.comparesHashes = message.comparesHashes);
        message.finalizationCriteria !== undefined && (obj.finalizationCriteria = Math.round(message.finalizationCriteria));
        message.savedBlocks !== undefined && (obj.savedBlocks = Math.round(message.savedBlocks));
        message.averageBlockTime !== undefined &&
            (obj.averageBlockTime = (message.averageBlockTime || long_1.default.ZERO).toString());
        message.allowedBlockLagForQosSync !== undefined &&
            (obj.allowedBlockLagForQosSync = (message.allowedBlockLagForQosSync || long_1.default.ZERO).toString());
        message.blockLastUpdated !== undefined &&
            (obj.blockLastUpdated = (message.blockLastUpdated || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const message = createBaseSpec();
        message.index = (_a = object.index) !== null && _a !== void 0 ? _a : "";
        message.name = (_b = object.name) !== null && _b !== void 0 ? _b : "";
        message.apis = ((_c = object.apis) === null || _c === void 0 ? void 0 : _c.map((e) => service_api_1.ServiceApi.fromPartial(e))) || [];
        message.enabled = (_d = object.enabled) !== null && _d !== void 0 ? _d : false;
        message.reliabilityThreshold = (_e = object.reliabilityThreshold) !== null && _e !== void 0 ? _e : 0;
        message.comparesHashes = (_f = object.comparesHashes) !== null && _f !== void 0 ? _f : false;
        message.finalizationCriteria = (_g = object.finalizationCriteria) !== null && _g !== void 0 ? _g : 0;
        message.savedBlocks = (_h = object.savedBlocks) !== null && _h !== void 0 ? _h : 0;
        message.averageBlockTime = (object.averageBlockTime !== undefined && object.averageBlockTime !== null)
            ? long_1.default.fromValue(object.averageBlockTime)
            : long_1.default.ZERO;
        message.allowedBlockLagForQosSync =
            (object.allowedBlockLagForQosSync !== undefined && object.allowedBlockLagForQosSync !== null)
                ? long_1.default.fromValue(object.allowedBlockLagForQosSync)
                : long_1.default.ZERO;
        message.blockLastUpdated = (object.blockLastUpdated !== undefined && object.blockLastUpdated !== null)
            ? long_1.default.fromValue(object.blockLastUpdated)
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
