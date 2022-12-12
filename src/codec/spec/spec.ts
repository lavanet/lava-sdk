/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ServiceApi } from "./service_api";

export const protobufPackage = "lavanet.lava.spec";

export interface Spec {
  index: string;
  name: string;
  apis: ServiceApi[];
  enabled: boolean;
  reliabilityThreshold: number;
  comparesHashes: boolean;
  finalizationCriteria: number;
  savedBlocks: number;
  averageBlockTime: Long;
  allowedBlockLagForQosSync: Long;
  blockLastUpdated: Long;
}

function createBaseSpec(): Spec {
  return {
    index: "",
    name: "",
    apis: [],
    enabled: false,
    reliabilityThreshold: 0,
    comparesHashes: false,
    finalizationCriteria: 0,
    savedBlocks: 0,
    averageBlockTime: Long.ZERO,
    allowedBlockLagForQosSync: Long.ZERO,
    blockLastUpdated: Long.UZERO,
  };
}

export const Spec = {
  encode(message: Spec, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    for (const v of message.apis) {
      ServiceApi.encode(v!, writer.uint32(26).fork()).ldelim();
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

  decode(input: _m0.Reader | Uint8Array, length?: number): Spec {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
          message.apis.push(ServiceApi.decode(reader, reader.uint32()));
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
          message.averageBlockTime = reader.int64() as Long;
          break;
        case 10:
          message.allowedBlockLagForQosSync = reader.int64() as Long;
          break;
        case 11:
          message.blockLastUpdated = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Spec {
    return {
      index: isSet(object.index) ? String(object.index) : "",
      name: isSet(object.name) ? String(object.name) : "",
      apis: Array.isArray(object?.apis) ? object.apis.map((e: any) => ServiceApi.fromJSON(e)) : [],
      enabled: isSet(object.enabled) ? Boolean(object.enabled) : false,
      reliabilityThreshold: isSet(object.reliabilityThreshold) ? Number(object.reliabilityThreshold) : 0,
      comparesHashes: isSet(object.comparesHashes) ? Boolean(object.comparesHashes) : false,
      finalizationCriteria: isSet(object.finalizationCriteria) ? Number(object.finalizationCriteria) : 0,
      savedBlocks: isSet(object.savedBlocks) ? Number(object.savedBlocks) : 0,
      averageBlockTime: isSet(object.averageBlockTime) ? Long.fromValue(object.averageBlockTime) : Long.ZERO,
      allowedBlockLagForQosSync: isSet(object.allowedBlockLagForQosSync)
        ? Long.fromValue(object.allowedBlockLagForQosSync)
        : Long.ZERO,
      blockLastUpdated: isSet(object.blockLastUpdated) ? Long.fromValue(object.blockLastUpdated) : Long.UZERO,
    };
  },

  toJSON(message: Spec): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.name !== undefined && (obj.name = message.name);
    if (message.apis) {
      obj.apis = message.apis.map((e) => e ? ServiceApi.toJSON(e) : undefined);
    } else {
      obj.apis = [];
    }
    message.enabled !== undefined && (obj.enabled = message.enabled);
    message.reliabilityThreshold !== undefined && (obj.reliabilityThreshold = Math.round(message.reliabilityThreshold));
    message.comparesHashes !== undefined && (obj.comparesHashes = message.comparesHashes);
    message.finalizationCriteria !== undefined && (obj.finalizationCriteria = Math.round(message.finalizationCriteria));
    message.savedBlocks !== undefined && (obj.savedBlocks = Math.round(message.savedBlocks));
    message.averageBlockTime !== undefined &&
      (obj.averageBlockTime = (message.averageBlockTime || Long.ZERO).toString());
    message.allowedBlockLagForQosSync !== undefined &&
      (obj.allowedBlockLagForQosSync = (message.allowedBlockLagForQosSync || Long.ZERO).toString());
    message.blockLastUpdated !== undefined &&
      (obj.blockLastUpdated = (message.blockLastUpdated || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Spec>, I>>(object: I): Spec {
    const message = createBaseSpec();
    message.index = object.index ?? "";
    message.name = object.name ?? "";
    message.apis = object.apis?.map((e) => ServiceApi.fromPartial(e)) || [];
    message.enabled = object.enabled ?? false;
    message.reliabilityThreshold = object.reliabilityThreshold ?? 0;
    message.comparesHashes = object.comparesHashes ?? false;
    message.finalizationCriteria = object.finalizationCriteria ?? 0;
    message.savedBlocks = object.savedBlocks ?? 0;
    message.averageBlockTime = (object.averageBlockTime !== undefined && object.averageBlockTime !== null)
      ? Long.fromValue(object.averageBlockTime)
      : Long.ZERO;
    message.allowedBlockLagForQosSync =
      (object.allowedBlockLagForQosSync !== undefined && object.allowedBlockLagForQosSync !== null)
        ? Long.fromValue(object.allowedBlockLagForQosSync)
        : Long.ZERO;
    message.blockLastUpdated = (object.blockLastUpdated !== undefined && object.blockLastUpdated !== null)
      ? Long.fromValue(object.blockLastUpdated)
      : Long.UZERO;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
