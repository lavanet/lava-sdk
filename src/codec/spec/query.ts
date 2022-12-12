/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
import { Params } from "./params";
import { Spec } from "./spec";

export const protobufPackage = "lavanet.lava.spec";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: Params;
}

export interface QueryGetSpecRequest {
  index: string;
}

export interface QueryGetSpecResponse {
  Spec?: Spec;
}

export interface QueryAllSpecRequest {
  pagination?: PageRequest;
}

export interface QueryAllSpecResponse {
  Spec: Spec[];
  pagination?: PageResponse;
}

export interface QueryChainRequest {
  chainID: string;
}

export interface QueryChainResponse {
  spec?: Spec;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryGetSpecRequest(): QueryGetSpecRequest {
  return { index: "" };
}

export const QueryGetSpecRequest = {
  encode(message: QueryGetSpecRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSpecRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSpecRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetSpecRequest {
    return { index: isSet(object.index) ? String(object.index) : "" };
  },

  toJSON(message: QueryGetSpecRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetSpecRequest>, I>>(object: I): QueryGetSpecRequest {
    const message = createBaseQueryGetSpecRequest();
    message.index = object.index ?? "";
    return message;
  },
};

function createBaseQueryGetSpecResponse(): QueryGetSpecResponse {
  return { Spec: undefined };
}

export const QueryGetSpecResponse = {
  encode(message: QueryGetSpecResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Spec !== undefined) {
      Spec.encode(message.Spec, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSpecResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSpecResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Spec = Spec.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetSpecResponse {
    return { Spec: isSet(object.Spec) ? Spec.fromJSON(object.Spec) : undefined };
  },

  toJSON(message: QueryGetSpecResponse): unknown {
    const obj: any = {};
    message.Spec !== undefined && (obj.Spec = message.Spec ? Spec.toJSON(message.Spec) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetSpecResponse>, I>>(object: I): QueryGetSpecResponse {
    const message = createBaseQueryGetSpecResponse();
    message.Spec = (object.Spec !== undefined && object.Spec !== null) ? Spec.fromPartial(object.Spec) : undefined;
    return message;
  },
};

function createBaseQueryAllSpecRequest(): QueryAllSpecRequest {
  return { pagination: undefined };
}

export const QueryAllSpecRequest = {
  encode(message: QueryAllSpecRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllSpecRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSpecRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllSpecRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllSpecRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllSpecRequest>, I>>(object: I): QueryAllSpecRequest {
    const message = createBaseQueryAllSpecRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllSpecResponse(): QueryAllSpecResponse {
  return { Spec: [], pagination: undefined };
}

export const QueryAllSpecResponse = {
  encode(message: QueryAllSpecResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Spec) {
      Spec.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllSpecResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSpecResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Spec.push(Spec.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllSpecResponse {
    return {
      Spec: Array.isArray(object?.Spec) ? object.Spec.map((e: any) => Spec.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllSpecResponse): unknown {
    const obj: any = {};
    if (message.Spec) {
      obj.Spec = message.Spec.map((e) => e ? Spec.toJSON(e) : undefined);
    } else {
      obj.Spec = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllSpecResponse>, I>>(object: I): QueryAllSpecResponse {
    const message = createBaseQueryAllSpecResponse();
    message.Spec = object.Spec?.map((e) => Spec.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryChainRequest(): QueryChainRequest {
  return { chainID: "" };
}

export const QueryChainRequest = {
  encode(message: QueryChainRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainID !== "") {
      writer.uint32(10).string(message.chainID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryChainRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChainRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryChainRequest {
    return { chainID: isSet(object.chainID) ? String(object.chainID) : "" };
  },

  toJSON(message: QueryChainRequest): unknown {
    const obj: any = {};
    message.chainID !== undefined && (obj.chainID = message.chainID);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryChainRequest>, I>>(object: I): QueryChainRequest {
    const message = createBaseQueryChainRequest();
    message.chainID = object.chainID ?? "";
    return message;
  },
};

function createBaseQueryChainResponse(): QueryChainResponse {
  return { spec: undefined };
}

export const QueryChainResponse = {
  encode(message: QueryChainResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.spec !== undefined) {
      Spec.encode(message.spec, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryChainResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.spec = Spec.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryChainResponse {
    return { spec: isSet(object.spec) ? Spec.fromJSON(object.spec) : undefined };
  },

  toJSON(message: QueryChainResponse): unknown {
    const obj: any = {};
    message.spec !== undefined && (obj.spec = message.spec ? Spec.toJSON(message.spec) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryChainResponse>, I>>(object: I): QueryChainResponse {
    const message = createBaseQueryChainResponse();
    message.spec = (object.spec !== undefined && object.spec !== null) ? Spec.fromPartial(object.spec) : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Spec by id. */
  Spec(request: QueryGetSpecRequest): Promise<QueryGetSpecResponse>;
  /** Queries a list of Spec items. */
  SpecAll(request: QueryAllSpecRequest): Promise<QueryAllSpecResponse>;
  /** Queries a list of Chain items. */
  Chain(request: QueryChainRequest): Promise<QueryChainResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "lavanet.lava.spec.Query";
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Spec = this.Spec.bind(this);
    this.SpecAll = this.SpecAll.bind(this);
    this.Chain = this.Chain.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  Spec(request: QueryGetSpecRequest): Promise<QueryGetSpecResponse> {
    const data = QueryGetSpecRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Spec", data);
    return promise.then((data) => QueryGetSpecResponse.decode(new _m0.Reader(data)));
  }

  SpecAll(request: QueryAllSpecRequest): Promise<QueryAllSpecResponse> {
    const data = QueryAllSpecRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SpecAll", data);
    return promise.then((data) => QueryAllSpecResponse.decode(new _m0.Reader(data)));
  }

  Chain(request: QueryChainRequest): Promise<QueryChainResponse> {
    const data = QueryChainRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Chain", data);
    return promise.then((data) => QueryChainResponse.decode(new _m0.Reader(data)));
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
