/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "lavanet.lava.pairing";

export interface RelayRequest {
  chainID: string;
  connectionType: string;
  /** some relays have associated urls that are filled with params ('/block/{height}') */
  apiUrl: string;
  sessionId: Long;
  /** total compute unit used including this relay */
  cuSum: Long;
  data: Uint8Array;
  sig: Uint8Array;
  provider: string;
  blockHeight: Long;
  relayNum: Long;
  requestBlock: Long;
  DataReliability?: VRFData;
  unresponsiveProviders: Uint8Array;
}

export interface RelayReply {
  data: Uint8Array;
  /** sign the data hash+query hash+nonce */
  sig: Uint8Array;
  nonce: number;
  latestBlock: Long;
  finalizedBlocksHashes: Uint8Array;
  /** sign latest_block+finalized_blocks_hashes+session_id+block_height+relay_num */
  sigBlocks: Uint8Array;
}

export interface VRFData {
  differentiator: boolean;
  vrfValue: Uint8Array;
  vrfProof: Uint8Array;
  providerSig: Uint8Array;
  allDataHash: Uint8Array;
  /** we only need it for payment later */
  queryHash: Uint8Array;
  sig: Uint8Array;
}

function createBaseRelayRequest(): RelayRequest {
  return {
    chainID: "",
    connectionType: "",
    apiUrl: "",
    sessionId: Long.UZERO,
    cuSum: Long.UZERO,
    data: new Uint8Array(),
    sig: new Uint8Array(),
    provider: "",
    blockHeight: Long.ZERO,
    relayNum: Long.UZERO,
    requestBlock: Long.ZERO,
    DataReliability: undefined,
    unresponsiveProviders: new Uint8Array(),
  };
}

export const RelayRequest = {
  encode(message: RelayRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainID !== "") {
      writer.uint32(10).string(message.chainID);
    }
    if (message.connectionType !== "") {
      writer.uint32(18).string(message.connectionType);
    }
    if (message.apiUrl !== "") {
      writer.uint32(26).string(message.apiUrl);
    }
    if (!message.sessionId.isZero()) {
      writer.uint32(32).uint64(message.sessionId);
    }
    if (!message.cuSum.isZero()) {
      writer.uint32(40).uint64(message.cuSum);
    }
    if (message.data.length !== 0) {
      writer.uint32(50).bytes(message.data);
    }
    if (message.sig.length !== 0) {
      writer.uint32(58).bytes(message.sig);
    }
    if (message.provider !== "") {
      writer.uint32(66).string(message.provider);
    }
    if (!message.blockHeight.isZero()) {
      writer.uint32(72).int64(message.blockHeight);
    }
    if (!message.relayNum.isZero()) {
      writer.uint32(80).uint64(message.relayNum);
    }
    if (!message.requestBlock.isZero()) {
      writer.uint32(88).int64(message.requestBlock);
    }
    if (message.DataReliability !== undefined) {
      VRFData.encode(message.DataReliability, writer.uint32(98).fork()).ldelim();
    }
    if (message.unresponsiveProviders.length !== 0) {
      writer.uint32(114).bytes(message.unresponsiveProviders);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RelayRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRelayRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainID = reader.string();
          break;
        case 2:
          message.connectionType = reader.string();
          break;
        case 3:
          message.apiUrl = reader.string();
          break;
        case 4:
          message.sessionId = reader.uint64() as Long;
          break;
        case 5:
          message.cuSum = reader.uint64() as Long;
          break;
        case 6:
          message.data = reader.bytes();
          break;
        case 7:
          message.sig = reader.bytes();
          break;
        case 8:
          message.provider = reader.string();
          break;
        case 9:
          message.blockHeight = reader.int64() as Long;
          break;
        case 10:
          message.relayNum = reader.uint64() as Long;
          break;
        case 11:
          message.requestBlock = reader.int64() as Long;
          break;
        case 12:
          message.DataReliability = VRFData.decode(reader, reader.uint32());
          break;
        case 14:
          message.unresponsiveProviders = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RelayRequest {
    return {
      chainID: isSet(object.chainID) ? String(object.chainID) : "",
      connectionType: isSet(object.connectionType) ? String(object.connectionType) : "",
      apiUrl: isSet(object.apiUrl) ? String(object.apiUrl) : "",
      sessionId: isSet(object.sessionId) ? Long.fromValue(object.sessionId) : Long.UZERO,
      cuSum: isSet(object.cuSum) ? Long.fromValue(object.cuSum) : Long.UZERO,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
      sig: isSet(object.sig) ? bytesFromBase64(object.sig) : new Uint8Array(),
      provider: isSet(object.provider) ? String(object.provider) : "",
      blockHeight: isSet(object.blockHeight) ? Long.fromValue(object.blockHeight) : Long.ZERO,
      relayNum: isSet(object.relayNum) ? Long.fromValue(object.relayNum) : Long.UZERO,
      requestBlock: isSet(object.requestBlock) ? Long.fromValue(object.requestBlock) : Long.ZERO,
      DataReliability: isSet(object.DataReliability) ? VRFData.fromJSON(object.DataReliability) : undefined,
      unresponsiveProviders: isSet(object.unresponsiveProviders)
        ? bytesFromBase64(object.unresponsiveProviders)
        : new Uint8Array(),
    };
  },

  toJSON(message: RelayRequest): unknown {
    const obj: any = {};
    message.chainID !== undefined && (obj.chainID = message.chainID);
    message.connectionType !== undefined && (obj.connectionType = message.connectionType);
    message.apiUrl !== undefined && (obj.apiUrl = message.apiUrl);
    message.sessionId !== undefined && (obj.sessionId = (message.sessionId || Long.UZERO).toString());
    message.cuSum !== undefined && (obj.cuSum = (message.cuSum || Long.UZERO).toString());
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    message.sig !== undefined &&
      (obj.sig = base64FromBytes(message.sig !== undefined ? message.sig : new Uint8Array()));
    message.provider !== undefined && (obj.provider = message.provider);
    message.blockHeight !== undefined && (obj.blockHeight = (message.blockHeight || Long.ZERO).toString());
    message.relayNum !== undefined && (obj.relayNum = (message.relayNum || Long.UZERO).toString());
    message.requestBlock !== undefined && (obj.requestBlock = (message.requestBlock || Long.ZERO).toString());
    message.DataReliability !== undefined &&
      (obj.DataReliability = message.DataReliability ? VRFData.toJSON(message.DataReliability) : undefined);
    message.unresponsiveProviders !== undefined &&
      (obj.unresponsiveProviders = base64FromBytes(
        message.unresponsiveProviders !== undefined ? message.unresponsiveProviders : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RelayRequest>, I>>(object: I): RelayRequest {
    const message = createBaseRelayRequest();
    message.chainID = object.chainID ?? "";
    message.connectionType = object.connectionType ?? "";
    message.apiUrl = object.apiUrl ?? "";
    message.sessionId = (object.sessionId !== undefined && object.sessionId !== null)
      ? Long.fromValue(object.sessionId)
      : Long.UZERO;
    message.cuSum = (object.cuSum !== undefined && object.cuSum !== null) ? Long.fromValue(object.cuSum) : Long.UZERO;
    message.data = object.data ?? new Uint8Array();
    message.sig = object.sig ?? new Uint8Array();
    message.provider = object.provider ?? "";
    message.blockHeight = (object.blockHeight !== undefined && object.blockHeight !== null)
      ? Long.fromValue(object.blockHeight)
      : Long.ZERO;
    message.relayNum = (object.relayNum !== undefined && object.relayNum !== null)
      ? Long.fromValue(object.relayNum)
      : Long.UZERO;
    message.requestBlock = (object.requestBlock !== undefined && object.requestBlock !== null)
      ? Long.fromValue(object.requestBlock)
      : Long.ZERO;
    message.DataReliability = (object.DataReliability !== undefined && object.DataReliability !== null)
      ? VRFData.fromPartial(object.DataReliability)
      : undefined;
    message.unresponsiveProviders = object.unresponsiveProviders ?? new Uint8Array();
    return message;
  },
};

function createBaseRelayReply(): RelayReply {
  return {
    data: new Uint8Array(),
    sig: new Uint8Array(),
    nonce: 0,
    latestBlock: Long.ZERO,
    finalizedBlocksHashes: new Uint8Array(),
    sigBlocks: new Uint8Array(),
  };
}

export const RelayReply = {
  encode(message: RelayReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    if (message.sig.length !== 0) {
      writer.uint32(18).bytes(message.sig);
    }
    if (message.nonce !== 0) {
      writer.uint32(24).uint32(message.nonce);
    }
    if (!message.latestBlock.isZero()) {
      writer.uint32(32).int64(message.latestBlock);
    }
    if (message.finalizedBlocksHashes.length !== 0) {
      writer.uint32(42).bytes(message.finalizedBlocksHashes);
    }
    if (message.sigBlocks.length !== 0) {
      writer.uint32(50).bytes(message.sigBlocks);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RelayReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRelayReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        case 2:
          message.sig = reader.bytes();
          break;
        case 3:
          message.nonce = reader.uint32();
          break;
        case 4:
          message.latestBlock = reader.int64() as Long;
          break;
        case 5:
          message.finalizedBlocksHashes = reader.bytes();
          break;
        case 6:
          message.sigBlocks = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RelayReply {
    return {
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
      sig: isSet(object.sig) ? bytesFromBase64(object.sig) : new Uint8Array(),
      nonce: isSet(object.nonce) ? Number(object.nonce) : 0,
      latestBlock: isSet(object.latestBlock) ? Long.fromValue(object.latestBlock) : Long.ZERO,
      finalizedBlocksHashes: isSet(object.finalizedBlocksHashes)
        ? bytesFromBase64(object.finalizedBlocksHashes)
        : new Uint8Array(),
      sigBlocks: isSet(object.sigBlocks) ? bytesFromBase64(object.sigBlocks) : new Uint8Array(),
    };
  },

  toJSON(message: RelayReply): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    message.sig !== undefined &&
      (obj.sig = base64FromBytes(message.sig !== undefined ? message.sig : new Uint8Array()));
    message.nonce !== undefined && (obj.nonce = Math.round(message.nonce));
    message.latestBlock !== undefined && (obj.latestBlock = (message.latestBlock || Long.ZERO).toString());
    message.finalizedBlocksHashes !== undefined &&
      (obj.finalizedBlocksHashes = base64FromBytes(
        message.finalizedBlocksHashes !== undefined ? message.finalizedBlocksHashes : new Uint8Array(),
      ));
    message.sigBlocks !== undefined &&
      (obj.sigBlocks = base64FromBytes(message.sigBlocks !== undefined ? message.sigBlocks : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RelayReply>, I>>(object: I): RelayReply {
    const message = createBaseRelayReply();
    message.data = object.data ?? new Uint8Array();
    message.sig = object.sig ?? new Uint8Array();
    message.nonce = object.nonce ?? 0;
    message.latestBlock = (object.latestBlock !== undefined && object.latestBlock !== null)
      ? Long.fromValue(object.latestBlock)
      : Long.ZERO;
    message.finalizedBlocksHashes = object.finalizedBlocksHashes ?? new Uint8Array();
    message.sigBlocks = object.sigBlocks ?? new Uint8Array();
    return message;
  },
};

function createBaseVRFData(): VRFData {
  return {
    differentiator: false,
    vrfValue: new Uint8Array(),
    vrfProof: new Uint8Array(),
    providerSig: new Uint8Array(),
    allDataHash: new Uint8Array(),
    queryHash: new Uint8Array(),
    sig: new Uint8Array(),
  };
}

export const VRFData = {
  encode(message: VRFData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.differentiator === true) {
      writer.uint32(8).bool(message.differentiator);
    }
    if (message.vrfValue.length !== 0) {
      writer.uint32(18).bytes(message.vrfValue);
    }
    if (message.vrfProof.length !== 0) {
      writer.uint32(26).bytes(message.vrfProof);
    }
    if (message.providerSig.length !== 0) {
      writer.uint32(34).bytes(message.providerSig);
    }
    if (message.allDataHash.length !== 0) {
      writer.uint32(42).bytes(message.allDataHash);
    }
    if (message.queryHash.length !== 0) {
      writer.uint32(50).bytes(message.queryHash);
    }
    if (message.sig.length !== 0) {
      writer.uint32(58).bytes(message.sig);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VRFData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVRFData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.differentiator = reader.bool();
          break;
        case 2:
          message.vrfValue = reader.bytes();
          break;
        case 3:
          message.vrfProof = reader.bytes();
          break;
        case 4:
          message.providerSig = reader.bytes();
          break;
        case 5:
          message.allDataHash = reader.bytes();
          break;
        case 6:
          message.queryHash = reader.bytes();
          break;
        case 7:
          message.sig = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VRFData {
    return {
      differentiator: isSet(object.differentiator) ? Boolean(object.differentiator) : false,
      vrfValue: isSet(object.vrfValue) ? bytesFromBase64(object.vrfValue) : new Uint8Array(),
      vrfProof: isSet(object.vrfProof) ? bytesFromBase64(object.vrfProof) : new Uint8Array(),
      providerSig: isSet(object.providerSig) ? bytesFromBase64(object.providerSig) : new Uint8Array(),
      allDataHash: isSet(object.allDataHash) ? bytesFromBase64(object.allDataHash) : new Uint8Array(),
      queryHash: isSet(object.queryHash) ? bytesFromBase64(object.queryHash) : new Uint8Array(),
      sig: isSet(object.sig) ? bytesFromBase64(object.sig) : new Uint8Array(),
    };
  },

  toJSON(message: VRFData): unknown {
    const obj: any = {};
    message.differentiator !== undefined && (obj.differentiator = message.differentiator);
    message.vrfValue !== undefined &&
      (obj.vrfValue = base64FromBytes(message.vrfValue !== undefined ? message.vrfValue : new Uint8Array()));
    message.vrfProof !== undefined &&
      (obj.vrfProof = base64FromBytes(message.vrfProof !== undefined ? message.vrfProof : new Uint8Array()));
    message.providerSig !== undefined &&
      (obj.providerSig = base64FromBytes(message.providerSig !== undefined ? message.providerSig : new Uint8Array()));
    message.allDataHash !== undefined &&
      (obj.allDataHash = base64FromBytes(message.allDataHash !== undefined ? message.allDataHash : new Uint8Array()));
    message.queryHash !== undefined &&
      (obj.queryHash = base64FromBytes(message.queryHash !== undefined ? message.queryHash : new Uint8Array()));
    message.sig !== undefined &&
      (obj.sig = base64FromBytes(message.sig !== undefined ? message.sig : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VRFData>, I>>(object: I): VRFData {
    const message = createBaseVRFData();
    message.differentiator = object.differentiator ?? false;
    message.vrfValue = object.vrfValue ?? new Uint8Array();
    message.vrfProof = object.vrfProof ?? new Uint8Array();
    message.providerSig = object.providerSig ?? new Uint8Array();
    message.allDataHash = object.allDataHash ?? new Uint8Array();
    message.queryHash = object.queryHash ?? new Uint8Array();
    message.sig = object.sig ?? new Uint8Array();
    return message;
  },
};

export interface Relayer {
  Relay(request: RelayRequest): Promise<RelayReply>;
}

export class RelayerClientImpl implements Relayer {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "lavanet.lava.pairing.Relayer";
    this.rpc = rpc;
    this.Relay = this.Relay.bind(this);
  }
  Relay(request: RelayRequest): Promise<RelayReply> {
    const data = RelayRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Relay", data);
    return promise.then((data) => RelayReply.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

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
