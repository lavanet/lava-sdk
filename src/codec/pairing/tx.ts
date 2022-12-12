/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";
import { Endpoint } from "../epochstorage/endpoint";
import { RelayRequest } from "./relay";

export const protobufPackage = "lavanet.lava.pairing";

export interface MsgStakeProvider {
  creator: string;
  chainID: string;
  amount?: Coin;
  endpoints: Endpoint[];
  geolocation: Long;
}

export interface MsgStakeProviderResponse {
}

export interface MsgStakeClient {
  creator: string;
  chainID: string;
  amount?: Coin;
  geolocation: Long;
  vrfpk: string;
}

export interface MsgStakeClientResponse {
}

export interface MsgUnstakeProvider {
  creator: string;
  chainID: string;
}

export interface MsgUnstakeProviderResponse {
}

export interface MsgUnstakeClient {
  creator: string;
  chainID: string;
}

export interface MsgUnstakeClientResponse {
}

export interface MsgRelayPayment {
  creator: string;
  relays: RelayRequest[];
  descriptionString: string;
}

export interface MsgRelayPaymentResponse {
}

function createBaseMsgStakeProvider(): MsgStakeProvider {
  return { creator: "", chainID: "", amount: undefined, endpoints: [], geolocation: Long.UZERO };
}

export const MsgStakeProvider = {
  encode(message: MsgStakeProvider, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.chainID !== "") {
      writer.uint32(18).string(message.chainID);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.endpoints) {
      Endpoint.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (!message.geolocation.isZero()) {
      writer.uint32(40).uint64(message.geolocation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStakeProvider {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStakeProvider();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.chainID = reader.string();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.endpoints.push(Endpoint.decode(reader, reader.uint32()));
          break;
        case 5:
          message.geolocation = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgStakeProvider {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      chainID: isSet(object.chainID) ? String(object.chainID) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      endpoints: Array.isArray(object?.endpoints) ? object.endpoints.map((e: any) => Endpoint.fromJSON(e)) : [],
      geolocation: isSet(object.geolocation) ? Long.fromValue(object.geolocation) : Long.UZERO,
    };
  },

  toJSON(message: MsgStakeProvider): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.chainID !== undefined && (obj.chainID = message.chainID);
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    if (message.endpoints) {
      obj.endpoints = message.endpoints.map((e) => e ? Endpoint.toJSON(e) : undefined);
    } else {
      obj.endpoints = [];
    }
    message.geolocation !== undefined && (obj.geolocation = (message.geolocation || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStakeProvider>, I>>(object: I): MsgStakeProvider {
    const message = createBaseMsgStakeProvider();
    message.creator = object.creator ?? "";
    message.chainID = object.chainID ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.endpoints = object.endpoints?.map((e) => Endpoint.fromPartial(e)) || [];
    message.geolocation = (object.geolocation !== undefined && object.geolocation !== null)
      ? Long.fromValue(object.geolocation)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgStakeProviderResponse(): MsgStakeProviderResponse {
  return {};
}

export const MsgStakeProviderResponse = {
  encode(_: MsgStakeProviderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStakeProviderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStakeProviderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgStakeProviderResponse {
    return {};
  },

  toJSON(_: MsgStakeProviderResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStakeProviderResponse>, I>>(_: I): MsgStakeProviderResponse {
    const message = createBaseMsgStakeProviderResponse();
    return message;
  },
};

function createBaseMsgStakeClient(): MsgStakeClient {
  return { creator: "", chainID: "", amount: undefined, geolocation: Long.UZERO, vrfpk: "" };
}

export const MsgStakeClient = {
  encode(message: MsgStakeClient, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.chainID !== "") {
      writer.uint32(18).string(message.chainID);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    if (!message.geolocation.isZero()) {
      writer.uint32(32).uint64(message.geolocation);
    }
    if (message.vrfpk !== "") {
      writer.uint32(42).string(message.vrfpk);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStakeClient {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStakeClient();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.chainID = reader.string();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.geolocation = reader.uint64() as Long;
          break;
        case 5:
          message.vrfpk = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgStakeClient {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      chainID: isSet(object.chainID) ? String(object.chainID) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      geolocation: isSet(object.geolocation) ? Long.fromValue(object.geolocation) : Long.UZERO,
      vrfpk: isSet(object.vrfpk) ? String(object.vrfpk) : "",
    };
  },

  toJSON(message: MsgStakeClient): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.chainID !== undefined && (obj.chainID = message.chainID);
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.geolocation !== undefined && (obj.geolocation = (message.geolocation || Long.UZERO).toString());
    message.vrfpk !== undefined && (obj.vrfpk = message.vrfpk);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStakeClient>, I>>(object: I): MsgStakeClient {
    const message = createBaseMsgStakeClient();
    message.creator = object.creator ?? "";
    message.chainID = object.chainID ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.geolocation = (object.geolocation !== undefined && object.geolocation !== null)
      ? Long.fromValue(object.geolocation)
      : Long.UZERO;
    message.vrfpk = object.vrfpk ?? "";
    return message;
  },
};

function createBaseMsgStakeClientResponse(): MsgStakeClientResponse {
  return {};
}

export const MsgStakeClientResponse = {
  encode(_: MsgStakeClientResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStakeClientResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStakeClientResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgStakeClientResponse {
    return {};
  },

  toJSON(_: MsgStakeClientResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStakeClientResponse>, I>>(_: I): MsgStakeClientResponse {
    const message = createBaseMsgStakeClientResponse();
    return message;
  },
};

function createBaseMsgUnstakeProvider(): MsgUnstakeProvider {
  return { creator: "", chainID: "" };
}

export const MsgUnstakeProvider = {
  encode(message: MsgUnstakeProvider, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.chainID !== "") {
      writer.uint32(18).string(message.chainID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnstakeProvider {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnstakeProvider();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.chainID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUnstakeProvider {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      chainID: isSet(object.chainID) ? String(object.chainID) : "",
    };
  },

  toJSON(message: MsgUnstakeProvider): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.chainID !== undefined && (obj.chainID = message.chainID);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnstakeProvider>, I>>(object: I): MsgUnstakeProvider {
    const message = createBaseMsgUnstakeProvider();
    message.creator = object.creator ?? "";
    message.chainID = object.chainID ?? "";
    return message;
  },
};

function createBaseMsgUnstakeProviderResponse(): MsgUnstakeProviderResponse {
  return {};
}

export const MsgUnstakeProviderResponse = {
  encode(_: MsgUnstakeProviderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnstakeProviderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnstakeProviderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUnstakeProviderResponse {
    return {};
  },

  toJSON(_: MsgUnstakeProviderResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnstakeProviderResponse>, I>>(_: I): MsgUnstakeProviderResponse {
    const message = createBaseMsgUnstakeProviderResponse();
    return message;
  },
};

function createBaseMsgUnstakeClient(): MsgUnstakeClient {
  return { creator: "", chainID: "" };
}

export const MsgUnstakeClient = {
  encode(message: MsgUnstakeClient, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.chainID !== "") {
      writer.uint32(18).string(message.chainID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnstakeClient {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnstakeClient();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.chainID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUnstakeClient {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      chainID: isSet(object.chainID) ? String(object.chainID) : "",
    };
  },

  toJSON(message: MsgUnstakeClient): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.chainID !== undefined && (obj.chainID = message.chainID);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnstakeClient>, I>>(object: I): MsgUnstakeClient {
    const message = createBaseMsgUnstakeClient();
    message.creator = object.creator ?? "";
    message.chainID = object.chainID ?? "";
    return message;
  },
};

function createBaseMsgUnstakeClientResponse(): MsgUnstakeClientResponse {
  return {};
}

export const MsgUnstakeClientResponse = {
  encode(_: MsgUnstakeClientResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnstakeClientResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnstakeClientResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUnstakeClientResponse {
    return {};
  },

  toJSON(_: MsgUnstakeClientResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnstakeClientResponse>, I>>(_: I): MsgUnstakeClientResponse {
    const message = createBaseMsgUnstakeClientResponse();
    return message;
  },
};

function createBaseMsgRelayPayment(): MsgRelayPayment {
  return { creator: "", relays: [], descriptionString: "" };
}

export const MsgRelayPayment = {
  encode(message: MsgRelayPayment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    for (const v of message.relays) {
      RelayRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.descriptionString !== "") {
      writer.uint32(26).string(message.descriptionString);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRelayPayment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRelayPayment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.relays.push(RelayRequest.decode(reader, reader.uint32()));
          break;
        case 3:
          message.descriptionString = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRelayPayment {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      relays: Array.isArray(object?.relays) ? object.relays.map((e: any) => RelayRequest.fromJSON(e)) : [],
      descriptionString: isSet(object.descriptionString) ? String(object.descriptionString) : "",
    };
  },

  toJSON(message: MsgRelayPayment): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    if (message.relays) {
      obj.relays = message.relays.map((e) => e ? RelayRequest.toJSON(e) : undefined);
    } else {
      obj.relays = [];
    }
    message.descriptionString !== undefined && (obj.descriptionString = message.descriptionString);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRelayPayment>, I>>(object: I): MsgRelayPayment {
    const message = createBaseMsgRelayPayment();
    message.creator = object.creator ?? "";
    message.relays = object.relays?.map((e) => RelayRequest.fromPartial(e)) || [];
    message.descriptionString = object.descriptionString ?? "";
    return message;
  },
};

function createBaseMsgRelayPaymentResponse(): MsgRelayPaymentResponse {
  return {};
}

export const MsgRelayPaymentResponse = {
  encode(_: MsgRelayPaymentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRelayPaymentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRelayPaymentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRelayPaymentResponse {
    return {};
  },

  toJSON(_: MsgRelayPaymentResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRelayPaymentResponse>, I>>(_: I): MsgRelayPaymentResponse {
    const message = createBaseMsgRelayPaymentResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  StakeProvider(request: MsgStakeProvider): Promise<MsgStakeProviderResponse>;
  StakeClient(request: MsgStakeClient): Promise<MsgStakeClientResponse>;
  UnstakeProvider(request: MsgUnstakeProvider): Promise<MsgUnstakeProviderResponse>;
  UnstakeClient(request: MsgUnstakeClient): Promise<MsgUnstakeClientResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  RelayPayment(request: MsgRelayPayment): Promise<MsgRelayPaymentResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "lavanet.lava.pairing.Msg";
    this.rpc = rpc;
    this.StakeProvider = this.StakeProvider.bind(this);
    this.StakeClient = this.StakeClient.bind(this);
    this.UnstakeProvider = this.UnstakeProvider.bind(this);
    this.UnstakeClient = this.UnstakeClient.bind(this);
    this.RelayPayment = this.RelayPayment.bind(this);
  }
  StakeProvider(request: MsgStakeProvider): Promise<MsgStakeProviderResponse> {
    const data = MsgStakeProvider.encode(request).finish();
    const promise = this.rpc.request(this.service, "StakeProvider", data);
    return promise.then((data) => MsgStakeProviderResponse.decode(new _m0.Reader(data)));
  }

  StakeClient(request: MsgStakeClient): Promise<MsgStakeClientResponse> {
    const data = MsgStakeClient.encode(request).finish();
    const promise = this.rpc.request(this.service, "StakeClient", data);
    return promise.then((data) => MsgStakeClientResponse.decode(new _m0.Reader(data)));
  }

  UnstakeProvider(request: MsgUnstakeProvider): Promise<MsgUnstakeProviderResponse> {
    const data = MsgUnstakeProvider.encode(request).finish();
    const promise = this.rpc.request(this.service, "UnstakeProvider", data);
    return promise.then((data) => MsgUnstakeProviderResponse.decode(new _m0.Reader(data)));
  }

  UnstakeClient(request: MsgUnstakeClient): Promise<MsgUnstakeClientResponse> {
    const data = MsgUnstakeClient.encode(request).finish();
    const promise = this.rpc.request(this.service, "UnstakeClient", data);
    return promise.then((data) => MsgUnstakeClientResponse.decode(new _m0.Reader(data)));
  }

  RelayPayment(request: MsgRelayPayment): Promise<MsgRelayPaymentResponse> {
    const data = MsgRelayPayment.encode(request).finish();
    const promise = this.rpc.request(this.service, "RelayPayment", data);
    return promise.then((data) => MsgRelayPaymentResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
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
