/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export const protobufPackage = "lavanet.lava.pairing";

export interface RelaySession {
  specId: string;
  contentHash: Uint8Array;
  sessionId: Long;
  /** total compute unit used including this relay */
  cuSum: Long;
  provider: string;
  relayNum: Long;
  epoch: Long;
  unresponsiveProviders: Uint8Array;
  lavaChainId: string;
  sig: Uint8Array;
  badge?: Badge;
}

export interface RelayPrivateData {
  connectionType: string;
  /** some relays have associated urls that are filled with params ('/block/{height}') */
  apiUrl: string;
  data: Uint8Array;
  requestBlock: Long;
  apiInterface: string;
  salt: Uint8Array;
}

export interface RelayRequest {
  relaySession?: RelaySession;
  relayData?: RelayPrivateData;
  dataReliability?: VRFData;
}

export interface Badge {
  cuAllocation: Long;
  epoch: Long;
  badgePk: Uint8Array;
  specId: string;
  projectSig: Uint8Array;
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
  chainId: string;
  epoch: Long;
  differentiator: boolean;
  vrfValue: Uint8Array;
  vrfProof: Uint8Array;
  providerSig: Uint8Array;
  allDataHash: Uint8Array;
  /** we only need it for payment later */
  queryHash: Uint8Array;
  sig: Uint8Array;
}

function createBaseRelaySession(): RelaySession {
  return {
    specId: "",
    contentHash: new Uint8Array(),
    sessionId: Long.UZERO,
    cuSum: Long.UZERO,
    provider: "",
    relayNum: Long.UZERO,
    epoch: Long.ZERO,
    unresponsiveProviders: new Uint8Array(),
    lavaChainId: "",
    sig: new Uint8Array(),
    badge: undefined,
  };
}

export const RelaySession = {
  encode(message: RelaySession, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.specId !== "") {
      writer.uint32(10).string(message.specId);
    }
    if (message.contentHash.length !== 0) {
      writer.uint32(18).bytes(message.contentHash);
    }
    if (!message.sessionId.isZero()) {
      writer.uint32(24).uint64(message.sessionId);
    }
    if (!message.cuSum.isZero()) {
      writer.uint32(32).uint64(message.cuSum);
    }
    if (message.provider !== "") {
      writer.uint32(42).string(message.provider);
    }
    if (!message.relayNum.isZero()) {
      writer.uint32(48).uint64(message.relayNum);
    }
    if (!message.epoch.isZero()) {
      writer.uint32(64).int64(message.epoch);
    }
    if (message.unresponsiveProviders.length !== 0) {
      writer.uint32(74).bytes(message.unresponsiveProviders);
    }
    if (message.lavaChainId !== "") {
      writer.uint32(82).string(message.lavaChainId);
    }
    if (message.sig.length !== 0) {
      writer.uint32(90).bytes(message.sig);
    }
    if (message.badge !== undefined) {
      Badge.encode(message.badge, writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RelaySession {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRelaySession();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.specId = reader.string();
          break;
        case 2:
          message.contentHash = reader.bytes();
          break;
        case 3:
          message.sessionId = reader.uint64() as Long;
          break;
        case 4:
          message.cuSum = reader.uint64() as Long;
          break;
        case 5:
          message.provider = reader.string();
          break;
        case 6:
          message.relayNum = reader.uint64() as Long;
          break;
        case 8:
          message.epoch = reader.int64() as Long;
          break;
        case 9:
          message.unresponsiveProviders = reader.bytes();
          break;
        case 10:
          message.lavaChainId = reader.string();
          break;
        case 11:
          message.sig = reader.bytes();
          break;
        case 12:
          message.badge = Badge.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RelaySession {
    return {
      specId: isSet(object.specId) ? String(object.specId) : "",
      contentHash: isSet(object.contentHash) ? bytesFromBase64(object.contentHash) : new Uint8Array(),
      sessionId: isSet(object.sessionId) ? Long.fromValue(object.sessionId) : Long.UZERO,
      cuSum: isSet(object.cuSum) ? Long.fromValue(object.cuSum) : Long.UZERO,
      provider: isSet(object.provider) ? String(object.provider) : "",
      relayNum: isSet(object.relayNum) ? Long.fromValue(object.relayNum) : Long.UZERO,
      epoch: isSet(object.epoch) ? Long.fromValue(object.epoch) : Long.ZERO,
      unresponsiveProviders: isSet(object.unresponsiveProviders)
        ? bytesFromBase64(object.unresponsiveProviders)
        : new Uint8Array(),
      lavaChainId: isSet(object.lavaChainId) ? String(object.lavaChainId) : "",
      sig: isSet(object.sig) ? bytesFromBase64(object.sig) : new Uint8Array(),
      badge: isSet(object.badge) ? Badge.fromJSON(object.badge) : undefined,
    };
  },

  toJSON(message: RelaySession): unknown {
    const obj: any = {};
    message.specId !== undefined && (obj.specId = message.specId);
    message.contentHash !== undefined &&
      (obj.contentHash = base64FromBytes(message.contentHash !== undefined ? message.contentHash : new Uint8Array()));
    message.sessionId !== undefined && (obj.sessionId = (message.sessionId || Long.UZERO).toString());
    message.cuSum !== undefined && (obj.cuSum = (message.cuSum || Long.UZERO).toString());
    message.provider !== undefined && (obj.provider = message.provider);
    message.relayNum !== undefined && (obj.relayNum = (message.relayNum || Long.UZERO).toString());
    message.epoch !== undefined && (obj.epoch = (message.epoch || Long.ZERO).toString());
    message.unresponsiveProviders !== undefined &&
      (obj.unresponsiveProviders = base64FromBytes(
        message.unresponsiveProviders !== undefined ? message.unresponsiveProviders : new Uint8Array(),
      ));
    message.lavaChainId !== undefined && (obj.lavaChainId = message.lavaChainId);
    message.sig !== undefined &&
      (obj.sig = base64FromBytes(message.sig !== undefined ? message.sig : new Uint8Array()));
    message.badge !== undefined && (obj.badge = message.badge ? Badge.toJSON(message.badge) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RelaySession>, I>>(object: I): RelaySession {
    const message = createBaseRelaySession();
    message.specId = object.specId ?? "";
    message.contentHash = object.contentHash ?? new Uint8Array();
    message.sessionId = (object.sessionId !== undefined && object.sessionId !== null)
      ? Long.fromValue(object.sessionId)
      : Long.UZERO;
    message.cuSum = (object.cuSum !== undefined && object.cuSum !== null) ? Long.fromValue(object.cuSum) : Long.UZERO;
    message.provider = object.provider ?? "";
    message.relayNum = (object.relayNum !== undefined && object.relayNum !== null)
      ? Long.fromValue(object.relayNum)
      : Long.UZERO;
    message.epoch = (object.epoch !== undefined && object.epoch !== null) ? Long.fromValue(object.epoch) : Long.ZERO;
    message.unresponsiveProviders = object.unresponsiveProviders ?? new Uint8Array();
    message.lavaChainId = object.lavaChainId ?? "";
    message.sig = object.sig ?? new Uint8Array();
    message.badge = (object.badge !== undefined && object.badge !== null) ? Badge.fromPartial(object.badge) : undefined;
    return message;
  },
};

function createBaseRelayPrivateData(): RelayPrivateData {
  return {
    connectionType: "",
    apiUrl: "",
    data: new Uint8Array(),
    requestBlock: Long.ZERO,
    apiInterface: "",
    salt: new Uint8Array(),
  };
}

export const RelayPrivateData = {
  encode(message: RelayPrivateData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connectionType !== "") {
      writer.uint32(10).string(message.connectionType);
    }
    if (message.apiUrl !== "") {
      writer.uint32(18).string(message.apiUrl);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    if (!message.requestBlock.isZero()) {
      writer.uint32(32).int64(message.requestBlock);
    }
    if (message.apiInterface !== "") {
      writer.uint32(42).string(message.apiInterface);
    }
    if (message.salt.length !== 0) {
      writer.uint32(50).bytes(message.salt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RelayPrivateData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRelayPrivateData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connectionType = reader.string();
          break;
        case 2:
          message.apiUrl = reader.string();
          break;
        case 3:
          message.data = reader.bytes();
          break;
        case 4:
          message.requestBlock = reader.int64() as Long;
          break;
        case 5:
          message.apiInterface = reader.string();
          break;
        case 6:
          message.salt = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RelayPrivateData {
    return {
      connectionType: isSet(object.connectionType) ? String(object.connectionType) : "",
      apiUrl: isSet(object.apiUrl) ? String(object.apiUrl) : "",
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
      requestBlock: isSet(object.requestBlock) ? Long.fromValue(object.requestBlock) : Long.ZERO,
      apiInterface: isSet(object.apiInterface) ? String(object.apiInterface) : "",
      salt: isSet(object.salt) ? bytesFromBase64(object.salt) : new Uint8Array(),
    };
  },

  toJSON(message: RelayPrivateData): unknown {
    const obj: any = {};
    message.connectionType !== undefined && (obj.connectionType = message.connectionType);
    message.apiUrl !== undefined && (obj.apiUrl = message.apiUrl);
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    message.requestBlock !== undefined && (obj.requestBlock = (message.requestBlock || Long.ZERO).toString());
    message.apiInterface !== undefined && (obj.apiInterface = message.apiInterface);
    message.salt !== undefined &&
      (obj.salt = base64FromBytes(message.salt !== undefined ? message.salt : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RelayPrivateData>, I>>(object: I): RelayPrivateData {
    const message = createBaseRelayPrivateData();
    message.connectionType = object.connectionType ?? "";
    message.apiUrl = object.apiUrl ?? "";
    message.data = object.data ?? new Uint8Array();
    message.requestBlock = (object.requestBlock !== undefined && object.requestBlock !== null)
      ? Long.fromValue(object.requestBlock)
      : Long.ZERO;
    message.apiInterface = object.apiInterface ?? "";
    message.salt = object.salt ?? new Uint8Array();
    return message;
  },
};

function createBaseRelayRequest(): RelayRequest {
  return { relaySession: undefined, relayData: undefined, dataReliability: undefined };
}

export const RelayRequest = {
  encode(message: RelayRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.relaySession !== undefined) {
      RelaySession.encode(message.relaySession, writer.uint32(10).fork()).ldelim();
    }
    if (message.relayData !== undefined) {
      RelayPrivateData.encode(message.relayData, writer.uint32(18).fork()).ldelim();
    }
    if (message.dataReliability !== undefined) {
      VRFData.encode(message.dataReliability, writer.uint32(26).fork()).ldelim();
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
          message.relaySession = RelaySession.decode(reader, reader.uint32());
          break;
        case 2:
          message.relayData = RelayPrivateData.decode(reader, reader.uint32());
          break;
        case 3:
          message.dataReliability = VRFData.decode(reader, reader.uint32());
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
      relaySession: isSet(object.relaySession) ? RelaySession.fromJSON(object.relaySession) : undefined,
      relayData: isSet(object.relayData) ? RelayPrivateData.fromJSON(object.relayData) : undefined,
      dataReliability: isSet(object.dataReliability) ? VRFData.fromJSON(object.dataReliability) : undefined,
    };
  },

  toJSON(message: RelayRequest): unknown {
    const obj: any = {};
    message.relaySession !== undefined &&
      (obj.relaySession = message.relaySession ? RelaySession.toJSON(message.relaySession) : undefined);
    message.relayData !== undefined &&
      (obj.relayData = message.relayData ? RelayPrivateData.toJSON(message.relayData) : undefined);
    message.dataReliability !== undefined &&
      (obj.dataReliability = message.dataReliability ? VRFData.toJSON(message.dataReliability) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RelayRequest>, I>>(object: I): RelayRequest {
    const message = createBaseRelayRequest();
    message.relaySession = (object.relaySession !== undefined && object.relaySession !== null)
      ? RelaySession.fromPartial(object.relaySession)
      : undefined;
    message.relayData = (object.relayData !== undefined && object.relayData !== null)
      ? RelayPrivateData.fromPartial(object.relayData)
      : undefined;
    message.dataReliability = (object.dataReliability !== undefined && object.dataReliability !== null)
      ? VRFData.fromPartial(object.dataReliability)
      : undefined;
    return message;
  },
};

function createBaseBadge(): Badge {
  return {
    cuAllocation: Long.UZERO,
    epoch: Long.ZERO,
    badgePk: new Uint8Array(),
    specId: "",
    projectSig: new Uint8Array(),
  };
}

export const Badge = {
  encode(message: Badge, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.cuAllocation.isZero()) {
      writer.uint32(8).uint64(message.cuAllocation);
    }
    if (!message.epoch.isZero()) {
      writer.uint32(16).int64(message.epoch);
    }
    if (message.badgePk.length !== 0) {
      writer.uint32(26).bytes(message.badgePk);
    }
    if (message.specId !== "") {
      writer.uint32(34).string(message.specId);
    }
    if (message.projectSig.length !== 0) {
      writer.uint32(42).bytes(message.projectSig);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Badge {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBadge();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cuAllocation = reader.uint64() as Long;
          break;
        case 2:
          message.epoch = reader.int64() as Long;
          break;
        case 3:
          message.badgePk = reader.bytes();
          break;
        case 4:
          message.specId = reader.string();
          break;
        case 5:
          message.projectSig = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Badge {
    return {
      cuAllocation: isSet(object.cuAllocation) ? Long.fromValue(object.cuAllocation) : Long.UZERO,
      epoch: isSet(object.epoch) ? Long.fromValue(object.epoch) : Long.ZERO,
      badgePk: isSet(object.badgePk) ? bytesFromBase64(object.badgePk) : new Uint8Array(),
      specId: isSet(object.specId) ? String(object.specId) : "",
      projectSig: isSet(object.projectSig) ? bytesFromBase64(object.projectSig) : new Uint8Array(),
    };
  },

  toJSON(message: Badge): unknown {
    const obj: any = {};
    message.cuAllocation !== undefined && (obj.cuAllocation = (message.cuAllocation || Long.UZERO).toString());
    message.epoch !== undefined && (obj.epoch = (message.epoch || Long.ZERO).toString());
    message.badgePk !== undefined &&
      (obj.badgePk = base64FromBytes(message.badgePk !== undefined ? message.badgePk : new Uint8Array()));
    message.specId !== undefined && (obj.specId = message.specId);
    message.projectSig !== undefined &&
      (obj.projectSig = base64FromBytes(message.projectSig !== undefined ? message.projectSig : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Badge>, I>>(object: I): Badge {
    const message = createBaseBadge();
    message.cuAllocation = (object.cuAllocation !== undefined && object.cuAllocation !== null)
      ? Long.fromValue(object.cuAllocation)
      : Long.UZERO;
    message.epoch = (object.epoch !== undefined && object.epoch !== null) ? Long.fromValue(object.epoch) : Long.ZERO;
    message.badgePk = object.badgePk ?? new Uint8Array();
    message.specId = object.specId ?? "";
    message.projectSig = object.projectSig ?? new Uint8Array();
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
    chainId: "",
    epoch: Long.ZERO,
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
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (!message.epoch.isZero()) {
      writer.uint32(16).int64(message.epoch);
    }
    if (message.differentiator === true) {
      writer.uint32(24).bool(message.differentiator);
    }
    if (message.vrfValue.length !== 0) {
      writer.uint32(34).bytes(message.vrfValue);
    }
    if (message.vrfProof.length !== 0) {
      writer.uint32(42).bytes(message.vrfProof);
    }
    if (message.providerSig.length !== 0) {
      writer.uint32(50).bytes(message.providerSig);
    }
    if (message.allDataHash.length !== 0) {
      writer.uint32(58).bytes(message.allDataHash);
    }
    if (message.queryHash.length !== 0) {
      writer.uint32(66).bytes(message.queryHash);
    }
    if (message.sig.length !== 0) {
      writer.uint32(74).bytes(message.sig);
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
          message.chainId = reader.string();
          break;
        case 2:
          message.epoch = reader.int64() as Long;
          break;
        case 3:
          message.differentiator = reader.bool();
          break;
        case 4:
          message.vrfValue = reader.bytes();
          break;
        case 5:
          message.vrfProof = reader.bytes();
          break;
        case 6:
          message.providerSig = reader.bytes();
          break;
        case 7:
          message.allDataHash = reader.bytes();
          break;
        case 8:
          message.queryHash = reader.bytes();
          break;
        case 9:
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
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      epoch: isSet(object.epoch) ? Long.fromValue(object.epoch) : Long.ZERO,
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
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.epoch !== undefined && (obj.epoch = (message.epoch || Long.ZERO).toString());
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
    message.chainId = object.chainId ?? "";
    message.epoch = (object.epoch !== undefined && object.epoch !== null) ? Long.fromValue(object.epoch) : Long.ZERO;
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
  RelaySubscribe(request: RelayRequest): Observable<RelayReply>;
}

export class RelayerClientImpl implements Relayer {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "lavanet.lava.pairing.Relayer";
    this.rpc = rpc;
    this.Relay = this.Relay.bind(this);
    this.RelaySubscribe = this.RelaySubscribe.bind(this);
  }
  Relay(request: RelayRequest): Promise<RelayReply> {
    const data = RelayRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Relay", data);
    return promise.then((data) => RelayReply.decode(new _m0.Reader(data)));
  }

  RelaySubscribe(request: RelayRequest): Observable<RelayReply> {
    const data = RelayRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "RelaySubscribe", data);
    return result.pipe(map((data) => RelayReply.decode(new _m0.Reader(data))));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
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
