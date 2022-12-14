"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QueryShowChainInfoResponse = exports.apiList = exports.QueryShowChainInfoRequest = exports.QueryShowAllChainsResponse = exports.QueryShowAllChainsRequest = exports.QueryAllSpecResponse = exports.QueryAllSpecRequest = exports.QueryGetSpecResponse = exports.QueryGetSpecRequest = exports.QueryParamsResponse = exports.QueryParamsRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const pagination_1 = require("../cosmos/base/query/v1beta1/pagination");
const params_1 = require("./params");
const spec_1 = require("./spec");
exports.protobufPackage = "lavanet.lava.spec";
function createBaseQueryParamsRequest() {
    return {};
}
exports.QueryParamsRequest = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseQueryParamsRequest();
        return message;
    },
};
function createBaseQueryParamsResponse() {
    return { params: undefined };
}
exports.QueryParamsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.params !== undefined) {
            params_1.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = params_1.Params.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { params: isSet(object.params) ? params_1.Params.fromJSON(object.params) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined && (obj.params = message.params ? params_1.Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryParamsResponse();
        message.params = (object.params !== undefined && object.params !== null)
            ? params_1.Params.fromPartial(object.params)
            : undefined;
        return message;
    },
};
function createBaseQueryGetSpecRequest() {
    return { ChainID: "" };
}
exports.QueryGetSpecRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.ChainID !== "") {
            writer.uint32(10).string(message.ChainID);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryGetSpecRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.ChainID = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { ChainID: isSet(object.ChainID) ? String(object.ChainID) : "" };
    },
    toJSON(message) {
        const obj = {};
        message.ChainID !== undefined && (obj.ChainID = message.ChainID);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryGetSpecRequest();
        message.ChainID = (_a = object.ChainID) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseQueryGetSpecResponse() {
    return { Spec: undefined };
}
exports.QueryGetSpecResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.Spec !== undefined) {
            spec_1.Spec.encode(message.Spec, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryGetSpecResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Spec = spec_1.Spec.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { Spec: isSet(object.Spec) ? spec_1.Spec.fromJSON(object.Spec) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.Spec !== undefined && (obj.Spec = message.Spec ? spec_1.Spec.toJSON(message.Spec) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryGetSpecResponse();
        message.Spec = (object.Spec !== undefined && object.Spec !== null) ? spec_1.Spec.fromPartial(object.Spec) : undefined;
        return message;
    },
};
function createBaseQueryAllSpecRequest() {
    return { pagination: undefined };
}
exports.QueryAllSpecRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllSpecRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { pagination: isSet(object.pagination) ? pagination_1.PageRequest.fromJSON(object.pagination) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryAllSpecRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? pagination_1.PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryAllSpecResponse() {
    return { Spec: [], pagination: undefined };
}
exports.QueryAllSpecResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.Spec) {
            spec_1.Spec.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllSpecResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Spec.push(spec_1.Spec.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
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
            Spec: Array.isArray(object === null || object === void 0 ? void 0 : object.Spec) ? object.Spec.map((e) => spec_1.Spec.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? pagination_1.PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.Spec) {
            obj.Spec = message.Spec.map((e) => e ? spec_1.Spec.toJSON(e) : undefined);
        }
        else {
            obj.Spec = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryAllSpecResponse();
        message.Spec = ((_a = object.Spec) === null || _a === void 0 ? void 0 : _a.map((e) => spec_1.Spec.fromPartial(e))) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? pagination_1.PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryShowAllChainsRequest() {
    return {};
}
exports.QueryShowAllChainsRequest = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryShowAllChainsRequest();
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
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseQueryShowAllChainsRequest();
        return message;
    },
};
function createBaseQueryShowAllChainsResponse() {
    return { chainNames: [] };
}
exports.QueryShowAllChainsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.chainNames) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryShowAllChainsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.chainNames.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { chainNames: Array.isArray(object === null || object === void 0 ? void 0 : object.chainNames) ? object.chainNames.map((e) => String(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.chainNames) {
            obj.chainNames = message.chainNames.map((e) => e);
        }
        else {
            obj.chainNames = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryShowAllChainsResponse();
        message.chainNames = ((_a = object.chainNames) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
function createBaseQueryShowChainInfoRequest() {
    return { chainName: "" };
}
exports.QueryShowChainInfoRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.chainName !== "") {
            writer.uint32(10).string(message.chainName);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryShowChainInfoRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.chainName = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { chainName: isSet(object.chainName) ? String(object.chainName) : "" };
    },
    toJSON(message) {
        const obj = {};
        message.chainName !== undefined && (obj.chainName = message.chainName);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryShowChainInfoRequest();
        message.chainName = (_a = object.chainName) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseapiList() {
    return { interface: "", supportedApis: [] };
}
exports.apiList = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.interface !== "") {
            writer.uint32(34).string(message.interface);
        }
        for (const v of message.supportedApis) {
            writer.uint32(42).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseapiList();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 4:
                    message.interface = reader.string();
                    break;
                case 5:
                    message.supportedApis.push(reader.string());
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
            interface: isSet(object.interface) ? String(object.interface) : "",
            supportedApis: Array.isArray(object === null || object === void 0 ? void 0 : object.supportedApis) ? object.supportedApis.map((e) => String(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.interface !== undefined && (obj.interface = message.interface);
        if (message.supportedApis) {
            obj.supportedApis = message.supportedApis.map((e) => e);
        }
        else {
            obj.supportedApis = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseapiList();
        message.interface = (_a = object.interface) !== null && _a !== void 0 ? _a : "";
        message.supportedApis = ((_b = object.supportedApis) === null || _b === void 0 ? void 0 : _b.map((e) => e)) || [];
        return message;
    },
};
function createBaseQueryShowChainInfoResponse() {
    return { chainID: "", interfaces: [], supportedApisInterfaceList: [] };
}
exports.QueryShowChainInfoResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.chainID !== "") {
            writer.uint32(10).string(message.chainID);
        }
        for (const v of message.interfaces) {
            writer.uint32(18).string(v);
        }
        for (const v of message.supportedApisInterfaceList) {
            exports.apiList.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryShowChainInfoResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.chainID = reader.string();
                    break;
                case 2:
                    message.interfaces.push(reader.string());
                    break;
                case 3:
                    message.supportedApisInterfaceList.push(exports.apiList.decode(reader, reader.uint32()));
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
            chainID: isSet(object.chainID) ? String(object.chainID) : "",
            interfaces: Array.isArray(object === null || object === void 0 ? void 0 : object.interfaces) ? object.interfaces.map((e) => String(e)) : [],
            supportedApisInterfaceList: Array.isArray(object === null || object === void 0 ? void 0 : object.supportedApisInterfaceList)
                ? object.supportedApisInterfaceList.map((e) => exports.apiList.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.chainID !== undefined && (obj.chainID = message.chainID);
        if (message.interfaces) {
            obj.interfaces = message.interfaces.map((e) => e);
        }
        else {
            obj.interfaces = [];
        }
        if (message.supportedApisInterfaceList) {
            obj.supportedApisInterfaceList = message.supportedApisInterfaceList.map((e) => e ? exports.apiList.toJSON(e) : undefined);
        }
        else {
            obj.supportedApisInterfaceList = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseQueryShowChainInfoResponse();
        message.chainID = (_a = object.chainID) !== null && _a !== void 0 ? _a : "";
        message.interfaces = ((_b = object.interfaces) === null || _b === void 0 ? void 0 : _b.map((e) => e)) || [];
        message.supportedApisInterfaceList = ((_c = object.supportedApisInterfaceList) === null || _c === void 0 ? void 0 : _c.map((e) => exports.apiList.fromPartial(e))) || [];
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc, opts) {
        this.service = (opts === null || opts === void 0 ? void 0 : opts.service) || "lavanet.lava.spec.Query";
        this.rpc = rpc;
        this.Params = this.Params.bind(this);
        this.Spec = this.Spec.bind(this);
        this.SpecAll = this.SpecAll.bind(this);
        this.ShowAllChains = this.ShowAllChains.bind(this);
        this.ShowChainInfo = this.ShowChainInfo.bind(this);
    }
    Params(request) {
        const data = exports.QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Params", data);
        return promise.then((data) => exports.QueryParamsResponse.decode(new minimal_1.default.Reader(data)));
    }
    Spec(request) {
        const data = exports.QueryGetSpecRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Spec", data);
        return promise.then((data) => exports.QueryGetSpecResponse.decode(new minimal_1.default.Reader(data)));
    }
    SpecAll(request) {
        const data = exports.QueryAllSpecRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "SpecAll", data);
        return promise.then((data) => exports.QueryAllSpecResponse.decode(new minimal_1.default.Reader(data)));
    }
    ShowAllChains(request) {
        const data = exports.QueryShowAllChainsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ShowAllChains", data);
        return promise.then((data) => exports.QueryShowAllChainsResponse.decode(new minimal_1.default.Reader(data)));
    }
    ShowChainInfo(request) {
        const data = exports.QueryShowChainInfoRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ShowChainInfo", data);
        return promise.then((data) => exports.QueryShowChainInfoResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
