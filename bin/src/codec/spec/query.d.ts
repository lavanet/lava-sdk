import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
import { Params } from "./params";
import { Spec } from "./spec";
export declare const protobufPackage = "lavanet.lava.spec";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params holds all the parameters of this module. */
    params?: Params;
}
export interface QueryGetSpecRequest {
    ChainID: string;
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
export interface QueryShowAllChainsRequest {
}
export interface QueryShowAllChainsResponse {
    chainNames: string[];
}
export interface QueryShowChainInfoRequest {
    chainName: string;
}
export interface apiList {
    interface: string;
    supportedApis: string[];
}
export interface QueryShowChainInfoResponse {
    chainID: string;
    interfaces: string[];
    supportedApisInterfaceList: apiList[];
}
export declare const QueryParamsRequest: {
    encode(_: QueryParamsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(_: any): QueryParamsRequest;
    toJSON(_: QueryParamsRequest): unknown;
    fromPartial<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(_: I): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    fromPartial<I extends {
        params?: {
            geolocationCount?: string | number | Long | undefined;
            maxCU?: string | number | Long | undefined;
        } | undefined;
    } & {
        params?: ({
            geolocationCount?: string | number | Long | undefined;
            maxCU?: string | number | Long | undefined;
        } & {
            geolocationCount?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K in Exclude<keyof I["params"]["geolocationCount"], keyof Long>]: never; }) | undefined;
            maxCU?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K_1 in Exclude<keyof I["params"]["maxCU"], keyof Long>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["params"], keyof Params>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "params">]: never; }>(object: I): QueryParamsResponse;
};
export declare const QueryGetSpecRequest: {
    encode(message: QueryGetSpecRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSpecRequest;
    fromJSON(object: any): QueryGetSpecRequest;
    toJSON(message: QueryGetSpecRequest): unknown;
    fromPartial<I extends {
        ChainID?: string | undefined;
    } & {
        ChainID?: string | undefined;
    } & { [K in Exclude<keyof I, "ChainID">]: never; }>(object: I): QueryGetSpecRequest;
};
export declare const QueryGetSpecResponse: {
    encode(message: QueryGetSpecResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSpecResponse;
    fromJSON(object: any): QueryGetSpecResponse;
    toJSON(message: QueryGetSpecResponse): unknown;
    fromPartial<I extends {
        Spec?: {
            index?: string | undefined;
            name?: string | undefined;
            apis?: {
                name?: string | undefined;
                blockParsing?: {
                    parserArg?: string[] | undefined;
                    parserFunc?: import("./service_api").parserFunc | undefined;
                } | undefined;
                computeUnits?: string | number | Long | undefined;
                enabled?: boolean | undefined;
                apiInterfaces?: {
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                }[] | undefined;
                category?: {
                    deterministic?: boolean | undefined;
                    local?: boolean | undefined;
                    subscription?: boolean | undefined;
                    stateful?: number | undefined;
                } | undefined;
                parsing?: {
                    functionTag?: string | undefined;
                    functionTemplate?: string | undefined;
                    resultParsing?: {
                        parserArg?: string[] | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } | undefined;
                } | undefined;
            }[] | undefined;
            enabled?: boolean | undefined;
            reliabilityThreshold?: number | undefined;
            comparesHashes?: boolean | undefined;
            finalizationCriteria?: number | undefined;
            savedBlocks?: number | undefined;
            averageBlockTime?: string | number | Long | undefined;
            allowedBlockLagForQosSync?: string | number | Long | undefined;
            blockLastUpdated?: string | number | Long | undefined;
        } | undefined;
    } & {
        Spec?: ({
            index?: string | undefined;
            name?: string | undefined;
            apis?: {
                name?: string | undefined;
                blockParsing?: {
                    parserArg?: string[] | undefined;
                    parserFunc?: import("./service_api").parserFunc | undefined;
                } | undefined;
                computeUnits?: string | number | Long | undefined;
                enabled?: boolean | undefined;
                apiInterfaces?: {
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                }[] | undefined;
                category?: {
                    deterministic?: boolean | undefined;
                    local?: boolean | undefined;
                    subscription?: boolean | undefined;
                    stateful?: number | undefined;
                } | undefined;
                parsing?: {
                    functionTag?: string | undefined;
                    functionTemplate?: string | undefined;
                    resultParsing?: {
                        parserArg?: string[] | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } | undefined;
                } | undefined;
            }[] | undefined;
            enabled?: boolean | undefined;
            reliabilityThreshold?: number | undefined;
            comparesHashes?: boolean | undefined;
            finalizationCriteria?: number | undefined;
            savedBlocks?: number | undefined;
            averageBlockTime?: string | number | Long | undefined;
            allowedBlockLagForQosSync?: string | number | Long | undefined;
            blockLastUpdated?: string | number | Long | undefined;
        } & {
            index?: string | undefined;
            name?: string | undefined;
            apis?: ({
                name?: string | undefined;
                blockParsing?: {
                    parserArg?: string[] | undefined;
                    parserFunc?: import("./service_api").parserFunc | undefined;
                } | undefined;
                computeUnits?: string | number | Long | undefined;
                enabled?: boolean | undefined;
                apiInterfaces?: {
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                }[] | undefined;
                category?: {
                    deterministic?: boolean | undefined;
                    local?: boolean | undefined;
                    subscription?: boolean | undefined;
                    stateful?: number | undefined;
                } | undefined;
                parsing?: {
                    functionTag?: string | undefined;
                    functionTemplate?: string | undefined;
                    resultParsing?: {
                        parserArg?: string[] | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } | undefined;
                } | undefined;
            }[] & ({
                name?: string | undefined;
                blockParsing?: {
                    parserArg?: string[] | undefined;
                    parserFunc?: import("./service_api").parserFunc | undefined;
                } | undefined;
                computeUnits?: string | number | Long | undefined;
                enabled?: boolean | undefined;
                apiInterfaces?: {
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                }[] | undefined;
                category?: {
                    deterministic?: boolean | undefined;
                    local?: boolean | undefined;
                    subscription?: boolean | undefined;
                    stateful?: number | undefined;
                } | undefined;
                parsing?: {
                    functionTag?: string | undefined;
                    functionTemplate?: string | undefined;
                    resultParsing?: {
                        parserArg?: string[] | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } | undefined;
                } | undefined;
            } & {
                name?: string | undefined;
                blockParsing?: ({
                    parserArg?: string[] | undefined;
                    parserFunc?: import("./service_api").parserFunc | undefined;
                } & {
                    parserArg?: (string[] & string[] & { [K in Exclude<keyof I["Spec"]["apis"][number]["blockParsing"]["parserArg"], keyof string[]>]: never; }) | undefined;
                    parserFunc?: import("./service_api").parserFunc | undefined;
                } & { [K_1 in Exclude<keyof I["Spec"]["apis"][number]["blockParsing"], keyof import("./service_api").BlockParser>]: never; }) | undefined;
                computeUnits?: string | number | (Long & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | Long) => Long;
                    and: (other: string | number | Long) => Long;
                    compare: (other: string | number | Long) => number;
                    comp: (other: string | number | Long) => number;
                    divide: (divisor: string | number | Long) => Long;
                    div: (divisor: string | number | Long) => Long;
                    equals: (other: string | number | Long) => boolean;
                    eq: (other: string | number | Long) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | Long) => boolean;
                    gt: (other: string | number | Long) => boolean;
                    greaterThanOrEqual: (other: string | number | Long) => boolean;
                    gte: (other: string | number | Long) => boolean;
                    ge: (other: string | number | Long) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | Long) => boolean;
                    lt: (other: string | number | Long) => boolean;
                    lessThanOrEqual: (other: string | number | Long) => boolean;
                    lte: (other: string | number | Long) => boolean;
                    le: (other: string | number | Long) => boolean;
                    modulo: (other: string | number | Long) => Long;
                    mod: (other: string | number | Long) => Long;
                    rem: (other: string | number | Long) => Long;
                    multiply: (multiplier: string | number | Long) => Long;
                    mul: (multiplier: string | number | Long) => Long;
                    negate: () => Long;
                    neg: () => Long;
                    not: () => Long;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | Long) => boolean;
                    neq: (other: string | number | Long) => boolean;
                    ne: (other: string | number | Long) => boolean;
                    or: (other: string | number | Long) => Long;
                    shiftLeft: (numBits: number | Long) => Long;
                    shl: (numBits: number | Long) => Long;
                    shiftRight: (numBits: number | Long) => Long;
                    shr: (numBits: number | Long) => Long;
                    shiftRightUnsigned: (numBits: number | Long) => Long;
                    shru: (numBits: number | Long) => Long;
                    shr_u: (numBits: number | Long) => Long;
                    rotateLeft: (numBits: number | Long) => Long;
                    rotl: (numBits: number | Long) => Long;
                    rotateRight: (numBits: number | Long) => Long;
                    rotr: (numBits: number | Long) => Long;
                    subtract: (subtrahend: string | number | Long) => Long;
                    sub: (subtrahend: string | number | Long) => Long;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => Long;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => Long;
                    xor: (other: string | number | Long) => Long;
                } & { [K_2 in Exclude<keyof I["Spec"]["apis"][number]["computeUnits"], keyof Long>]: never; }) | undefined;
                enabled?: boolean | undefined;
                apiInterfaces?: ({
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                }[] & ({
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                } & {
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | (Long & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | Long) => Long;
                        and: (other: string | number | Long) => Long;
                        compare: (other: string | number | Long) => number;
                        comp: (other: string | number | Long) => number;
                        divide: (divisor: string | number | Long) => Long;
                        div: (divisor: string | number | Long) => Long;
                        equals: (other: string | number | Long) => boolean;
                        eq: (other: string | number | Long) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | Long) => boolean;
                        gt: (other: string | number | Long) => boolean;
                        greaterThanOrEqual: (other: string | number | Long) => boolean;
                        gte: (other: string | number | Long) => boolean;
                        ge: (other: string | number | Long) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | Long) => boolean;
                        lt: (other: string | number | Long) => boolean;
                        lessThanOrEqual: (other: string | number | Long) => boolean;
                        lte: (other: string | number | Long) => boolean;
                        le: (other: string | number | Long) => boolean;
                        modulo: (other: string | number | Long) => Long;
                        mod: (other: string | number | Long) => Long;
                        rem: (other: string | number | Long) => Long;
                        multiply: (multiplier: string | number | Long) => Long;
                        mul: (multiplier: string | number | Long) => Long;
                        negate: () => Long;
                        neg: () => Long;
                        not: () => Long;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | Long) => boolean;
                        neq: (other: string | number | Long) => boolean;
                        ne: (other: string | number | Long) => boolean;
                        or: (other: string | number | Long) => Long;
                        shiftLeft: (numBits: number | Long) => Long;
                        shl: (numBits: number | Long) => Long;
                        shiftRight: (numBits: number | Long) => Long;
                        shr: (numBits: number | Long) => Long;
                        shiftRightUnsigned: (numBits: number | Long) => Long;
                        shru: (numBits: number | Long) => Long;
                        shr_u: (numBits: number | Long) => Long;
                        rotateLeft: (numBits: number | Long) => Long;
                        rotl: (numBits: number | Long) => Long;
                        rotateRight: (numBits: number | Long) => Long;
                        rotr: (numBits: number | Long) => Long;
                        subtract: (subtrahend: string | number | Long) => Long;
                        sub: (subtrahend: string | number | Long) => Long;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => Long;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => Long;
                        xor: (other: string | number | Long) => Long;
                    } & { [K_3 in Exclude<keyof I["Spec"]["apis"][number]["apiInterfaces"][number]["extraComputeUnits"], keyof Long>]: never; }) | undefined;
                } & { [K_4 in Exclude<keyof I["Spec"]["apis"][number]["apiInterfaces"][number], keyof import("./service_api").ApiInterface>]: never; })[] & { [K_5 in Exclude<keyof I["Spec"]["apis"][number]["apiInterfaces"], keyof {
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                }[]>]: never; }) | undefined;
                category?: ({
                    deterministic?: boolean | undefined;
                    local?: boolean | undefined;
                    subscription?: boolean | undefined;
                    stateful?: number | undefined;
                } & {
                    deterministic?: boolean | undefined;
                    local?: boolean | undefined;
                    subscription?: boolean | undefined;
                    stateful?: number | undefined;
                } & { [K_6 in Exclude<keyof I["Spec"]["apis"][number]["category"], keyof import("./service_api").SpecCategory>]: never; }) | undefined;
                parsing?: ({
                    functionTag?: string | undefined;
                    functionTemplate?: string | undefined;
                    resultParsing?: {
                        parserArg?: string[] | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } | undefined;
                } & {
                    functionTag?: string | undefined;
                    functionTemplate?: string | undefined;
                    resultParsing?: ({
                        parserArg?: string[] | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } & {
                        parserArg?: (string[] & string[] & { [K_7 in Exclude<keyof I["Spec"]["apis"][number]["parsing"]["resultParsing"]["parserArg"], keyof string[]>]: never; }) | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } & { [K_8 in Exclude<keyof I["Spec"]["apis"][number]["parsing"]["resultParsing"], keyof import("./service_api").BlockParser>]: never; }) | undefined;
                } & { [K_9 in Exclude<keyof I["Spec"]["apis"][number]["parsing"], keyof import("./service_api").Parsing>]: never; }) | undefined;
            } & { [K_10 in Exclude<keyof I["Spec"]["apis"][number], keyof import("./service_api").ServiceApi>]: never; })[] & { [K_11 in Exclude<keyof I["Spec"]["apis"], keyof {
                name?: string | undefined;
                blockParsing?: {
                    parserArg?: string[] | undefined;
                    parserFunc?: import("./service_api").parserFunc | undefined;
                } | undefined;
                computeUnits?: string | number | Long | undefined;
                enabled?: boolean | undefined;
                apiInterfaces?: {
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                }[] | undefined;
                category?: {
                    deterministic?: boolean | undefined;
                    local?: boolean | undefined;
                    subscription?: boolean | undefined;
                    stateful?: number | undefined;
                } | undefined;
                parsing?: {
                    functionTag?: string | undefined;
                    functionTemplate?: string | undefined;
                    resultParsing?: {
                        parserArg?: string[] | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } | undefined;
                } | undefined;
            }[]>]: never; }) | undefined;
            enabled?: boolean | undefined;
            reliabilityThreshold?: number | undefined;
            comparesHashes?: boolean | undefined;
            finalizationCriteria?: number | undefined;
            savedBlocks?: number | undefined;
            averageBlockTime?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K_12 in Exclude<keyof I["Spec"]["averageBlockTime"], keyof Long>]: never; }) | undefined;
            allowedBlockLagForQosSync?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K_13 in Exclude<keyof I["Spec"]["allowedBlockLagForQosSync"], keyof Long>]: never; }) | undefined;
            blockLastUpdated?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K_14 in Exclude<keyof I["Spec"]["blockLastUpdated"], keyof Long>]: never; }) | undefined;
        } & { [K_15 in Exclude<keyof I["Spec"], keyof Spec>]: never; }) | undefined;
    } & { [K_16 in Exclude<keyof I, "Spec">]: never; }>(object: I): QueryGetSpecResponse;
};
export declare const QueryAllSpecRequest: {
    encode(message: QueryAllSpecRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllSpecRequest;
    fromJSON(object: any): QueryAllSpecRequest;
    toJSON(message: QueryAllSpecRequest): unknown;
    fromPartial<I extends {
        pagination?: {
            key?: Uint8Array | undefined;
            offset?: string | number | Long | undefined;
            limit?: string | number | Long | undefined;
            countTotal?: boolean | undefined;
            reverse?: boolean | undefined;
        } | undefined;
    } & {
        pagination?: ({
            key?: Uint8Array | undefined;
            offset?: string | number | Long | undefined;
            limit?: string | number | Long | undefined;
            countTotal?: boolean | undefined;
            reverse?: boolean | undefined;
        } & {
            key?: Uint8Array | undefined;
            offset?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K in Exclude<keyof I["pagination"]["offset"], keyof Long>]: never; }) | undefined;
            limit?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K_1 in Exclude<keyof I["pagination"]["limit"], keyof Long>]: never; }) | undefined;
            countTotal?: boolean | undefined;
            reverse?: boolean | undefined;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageRequest>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "pagination">]: never; }>(object: I): QueryAllSpecRequest;
};
export declare const QueryAllSpecResponse: {
    encode(message: QueryAllSpecResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllSpecResponse;
    fromJSON(object: any): QueryAllSpecResponse;
    toJSON(message: QueryAllSpecResponse): unknown;
    fromPartial<I extends {
        Spec?: {
            index?: string | undefined;
            name?: string | undefined;
            apis?: {
                name?: string | undefined;
                blockParsing?: {
                    parserArg?: string[] | undefined;
                    parserFunc?: import("./service_api").parserFunc | undefined;
                } | undefined;
                computeUnits?: string | number | Long | undefined;
                enabled?: boolean | undefined;
                apiInterfaces?: {
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                }[] | undefined;
                category?: {
                    deterministic?: boolean | undefined;
                    local?: boolean | undefined;
                    subscription?: boolean | undefined;
                    stateful?: number | undefined;
                } | undefined;
                parsing?: {
                    functionTag?: string | undefined;
                    functionTemplate?: string | undefined;
                    resultParsing?: {
                        parserArg?: string[] | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } | undefined;
                } | undefined;
            }[] | undefined;
            enabled?: boolean | undefined;
            reliabilityThreshold?: number | undefined;
            comparesHashes?: boolean | undefined;
            finalizationCriteria?: number | undefined;
            savedBlocks?: number | undefined;
            averageBlockTime?: string | number | Long | undefined;
            allowedBlockLagForQosSync?: string | number | Long | undefined;
            blockLastUpdated?: string | number | Long | undefined;
        }[] | undefined;
        pagination?: {
            nextKey?: Uint8Array | undefined;
            total?: string | number | Long | undefined;
        } | undefined;
    } & {
        Spec?: ({
            index?: string | undefined;
            name?: string | undefined;
            apis?: {
                name?: string | undefined;
                blockParsing?: {
                    parserArg?: string[] | undefined;
                    parserFunc?: import("./service_api").parserFunc | undefined;
                } | undefined;
                computeUnits?: string | number | Long | undefined;
                enabled?: boolean | undefined;
                apiInterfaces?: {
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                }[] | undefined;
                category?: {
                    deterministic?: boolean | undefined;
                    local?: boolean | undefined;
                    subscription?: boolean | undefined;
                    stateful?: number | undefined;
                } | undefined;
                parsing?: {
                    functionTag?: string | undefined;
                    functionTemplate?: string | undefined;
                    resultParsing?: {
                        parserArg?: string[] | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } | undefined;
                } | undefined;
            }[] | undefined;
            enabled?: boolean | undefined;
            reliabilityThreshold?: number | undefined;
            comparesHashes?: boolean | undefined;
            finalizationCriteria?: number | undefined;
            savedBlocks?: number | undefined;
            averageBlockTime?: string | number | Long | undefined;
            allowedBlockLagForQosSync?: string | number | Long | undefined;
            blockLastUpdated?: string | number | Long | undefined;
        }[] & ({
            index?: string | undefined;
            name?: string | undefined;
            apis?: {
                name?: string | undefined;
                blockParsing?: {
                    parserArg?: string[] | undefined;
                    parserFunc?: import("./service_api").parserFunc | undefined;
                } | undefined;
                computeUnits?: string | number | Long | undefined;
                enabled?: boolean | undefined;
                apiInterfaces?: {
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                }[] | undefined;
                category?: {
                    deterministic?: boolean | undefined;
                    local?: boolean | undefined;
                    subscription?: boolean | undefined;
                    stateful?: number | undefined;
                } | undefined;
                parsing?: {
                    functionTag?: string | undefined;
                    functionTemplate?: string | undefined;
                    resultParsing?: {
                        parserArg?: string[] | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } | undefined;
                } | undefined;
            }[] | undefined;
            enabled?: boolean | undefined;
            reliabilityThreshold?: number | undefined;
            comparesHashes?: boolean | undefined;
            finalizationCriteria?: number | undefined;
            savedBlocks?: number | undefined;
            averageBlockTime?: string | number | Long | undefined;
            allowedBlockLagForQosSync?: string | number | Long | undefined;
            blockLastUpdated?: string | number | Long | undefined;
        } & {
            index?: string | undefined;
            name?: string | undefined;
            apis?: ({
                name?: string | undefined;
                blockParsing?: {
                    parserArg?: string[] | undefined;
                    parserFunc?: import("./service_api").parserFunc | undefined;
                } | undefined;
                computeUnits?: string | number | Long | undefined;
                enabled?: boolean | undefined;
                apiInterfaces?: {
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                }[] | undefined;
                category?: {
                    deterministic?: boolean | undefined;
                    local?: boolean | undefined;
                    subscription?: boolean | undefined;
                    stateful?: number | undefined;
                } | undefined;
                parsing?: {
                    functionTag?: string | undefined;
                    functionTemplate?: string | undefined;
                    resultParsing?: {
                        parserArg?: string[] | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } | undefined;
                } | undefined;
            }[] & ({
                name?: string | undefined;
                blockParsing?: {
                    parserArg?: string[] | undefined;
                    parserFunc?: import("./service_api").parserFunc | undefined;
                } | undefined;
                computeUnits?: string | number | Long | undefined;
                enabled?: boolean | undefined;
                apiInterfaces?: {
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                }[] | undefined;
                category?: {
                    deterministic?: boolean | undefined;
                    local?: boolean | undefined;
                    subscription?: boolean | undefined;
                    stateful?: number | undefined;
                } | undefined;
                parsing?: {
                    functionTag?: string | undefined;
                    functionTemplate?: string | undefined;
                    resultParsing?: {
                        parserArg?: string[] | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } | undefined;
                } | undefined;
            } & {
                name?: string | undefined;
                blockParsing?: ({
                    parserArg?: string[] | undefined;
                    parserFunc?: import("./service_api").parserFunc | undefined;
                } & {
                    parserArg?: (string[] & string[] & { [K in Exclude<keyof I["Spec"][number]["apis"][number]["blockParsing"]["parserArg"], keyof string[]>]: never; }) | undefined;
                    parserFunc?: import("./service_api").parserFunc | undefined;
                } & { [K_1 in Exclude<keyof I["Spec"][number]["apis"][number]["blockParsing"], keyof import("./service_api").BlockParser>]: never; }) | undefined;
                computeUnits?: string | number | (Long & {
                    high: number;
                    low: number;
                    unsigned: boolean;
                    add: (addend: string | number | Long) => Long;
                    and: (other: string | number | Long) => Long;
                    compare: (other: string | number | Long) => number;
                    comp: (other: string | number | Long) => number;
                    divide: (divisor: string | number | Long) => Long;
                    div: (divisor: string | number | Long) => Long;
                    equals: (other: string | number | Long) => boolean;
                    eq: (other: string | number | Long) => boolean;
                    getHighBits: () => number;
                    getHighBitsUnsigned: () => number;
                    getLowBits: () => number;
                    getLowBitsUnsigned: () => number;
                    getNumBitsAbs: () => number;
                    greaterThan: (other: string | number | Long) => boolean;
                    gt: (other: string | number | Long) => boolean;
                    greaterThanOrEqual: (other: string | number | Long) => boolean;
                    gte: (other: string | number | Long) => boolean;
                    ge: (other: string | number | Long) => boolean;
                    isEven: () => boolean;
                    isNegative: () => boolean;
                    isOdd: () => boolean;
                    isPositive: () => boolean;
                    isZero: () => boolean;
                    eqz: () => boolean;
                    lessThan: (other: string | number | Long) => boolean;
                    lt: (other: string | number | Long) => boolean;
                    lessThanOrEqual: (other: string | number | Long) => boolean;
                    lte: (other: string | number | Long) => boolean;
                    le: (other: string | number | Long) => boolean;
                    modulo: (other: string | number | Long) => Long;
                    mod: (other: string | number | Long) => Long;
                    rem: (other: string | number | Long) => Long;
                    multiply: (multiplier: string | number | Long) => Long;
                    mul: (multiplier: string | number | Long) => Long;
                    negate: () => Long;
                    neg: () => Long;
                    not: () => Long;
                    countLeadingZeros: () => number;
                    clz: () => number;
                    countTrailingZeros: () => number;
                    ctz: () => number;
                    notEquals: (other: string | number | Long) => boolean;
                    neq: (other: string | number | Long) => boolean;
                    ne: (other: string | number | Long) => boolean;
                    or: (other: string | number | Long) => Long;
                    shiftLeft: (numBits: number | Long) => Long;
                    shl: (numBits: number | Long) => Long;
                    shiftRight: (numBits: number | Long) => Long;
                    shr: (numBits: number | Long) => Long;
                    shiftRightUnsigned: (numBits: number | Long) => Long;
                    shru: (numBits: number | Long) => Long;
                    shr_u: (numBits: number | Long) => Long;
                    rotateLeft: (numBits: number | Long) => Long;
                    rotl: (numBits: number | Long) => Long;
                    rotateRight: (numBits: number | Long) => Long;
                    rotr: (numBits: number | Long) => Long;
                    subtract: (subtrahend: string | number | Long) => Long;
                    sub: (subtrahend: string | number | Long) => Long;
                    toInt: () => number;
                    toNumber: () => number;
                    toBytes: (le?: boolean | undefined) => number[];
                    toBytesLE: () => number[];
                    toBytesBE: () => number[];
                    toSigned: () => Long;
                    toString: (radix?: number | undefined) => string;
                    toUnsigned: () => Long;
                    xor: (other: string | number | Long) => Long;
                } & { [K_2 in Exclude<keyof I["Spec"][number]["apis"][number]["computeUnits"], keyof Long>]: never; }) | undefined;
                enabled?: boolean | undefined;
                apiInterfaces?: ({
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                }[] & ({
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                } & {
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | (Long & {
                        high: number;
                        low: number;
                        unsigned: boolean;
                        add: (addend: string | number | Long) => Long;
                        and: (other: string | number | Long) => Long;
                        compare: (other: string | number | Long) => number;
                        comp: (other: string | number | Long) => number;
                        divide: (divisor: string | number | Long) => Long;
                        div: (divisor: string | number | Long) => Long;
                        equals: (other: string | number | Long) => boolean;
                        eq: (other: string | number | Long) => boolean;
                        getHighBits: () => number;
                        getHighBitsUnsigned: () => number;
                        getLowBits: () => number;
                        getLowBitsUnsigned: () => number;
                        getNumBitsAbs: () => number;
                        greaterThan: (other: string | number | Long) => boolean;
                        gt: (other: string | number | Long) => boolean;
                        greaterThanOrEqual: (other: string | number | Long) => boolean;
                        gte: (other: string | number | Long) => boolean;
                        ge: (other: string | number | Long) => boolean;
                        isEven: () => boolean;
                        isNegative: () => boolean;
                        isOdd: () => boolean;
                        isPositive: () => boolean;
                        isZero: () => boolean;
                        eqz: () => boolean;
                        lessThan: (other: string | number | Long) => boolean;
                        lt: (other: string | number | Long) => boolean;
                        lessThanOrEqual: (other: string | number | Long) => boolean;
                        lte: (other: string | number | Long) => boolean;
                        le: (other: string | number | Long) => boolean;
                        modulo: (other: string | number | Long) => Long;
                        mod: (other: string | number | Long) => Long;
                        rem: (other: string | number | Long) => Long;
                        multiply: (multiplier: string | number | Long) => Long;
                        mul: (multiplier: string | number | Long) => Long;
                        negate: () => Long;
                        neg: () => Long;
                        not: () => Long;
                        countLeadingZeros: () => number;
                        clz: () => number;
                        countTrailingZeros: () => number;
                        ctz: () => number;
                        notEquals: (other: string | number | Long) => boolean;
                        neq: (other: string | number | Long) => boolean;
                        ne: (other: string | number | Long) => boolean;
                        or: (other: string | number | Long) => Long;
                        shiftLeft: (numBits: number | Long) => Long;
                        shl: (numBits: number | Long) => Long;
                        shiftRight: (numBits: number | Long) => Long;
                        shr: (numBits: number | Long) => Long;
                        shiftRightUnsigned: (numBits: number | Long) => Long;
                        shru: (numBits: number | Long) => Long;
                        shr_u: (numBits: number | Long) => Long;
                        rotateLeft: (numBits: number | Long) => Long;
                        rotl: (numBits: number | Long) => Long;
                        rotateRight: (numBits: number | Long) => Long;
                        rotr: (numBits: number | Long) => Long;
                        subtract: (subtrahend: string | number | Long) => Long;
                        sub: (subtrahend: string | number | Long) => Long;
                        toInt: () => number;
                        toNumber: () => number;
                        toBytes: (le?: boolean | undefined) => number[];
                        toBytesLE: () => number[];
                        toBytesBE: () => number[];
                        toSigned: () => Long;
                        toString: (radix?: number | undefined) => string;
                        toUnsigned: () => Long;
                        xor: (other: string | number | Long) => Long;
                    } & { [K_3 in Exclude<keyof I["Spec"][number]["apis"][number]["apiInterfaces"][number]["extraComputeUnits"], keyof Long>]: never; }) | undefined;
                } & { [K_4 in Exclude<keyof I["Spec"][number]["apis"][number]["apiInterfaces"][number], keyof import("./service_api").ApiInterface>]: never; })[] & { [K_5 in Exclude<keyof I["Spec"][number]["apis"][number]["apiInterfaces"], keyof {
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                }[]>]: never; }) | undefined;
                category?: ({
                    deterministic?: boolean | undefined;
                    local?: boolean | undefined;
                    subscription?: boolean | undefined;
                    stateful?: number | undefined;
                } & {
                    deterministic?: boolean | undefined;
                    local?: boolean | undefined;
                    subscription?: boolean | undefined;
                    stateful?: number | undefined;
                } & { [K_6 in Exclude<keyof I["Spec"][number]["apis"][number]["category"], keyof import("./service_api").SpecCategory>]: never; }) | undefined;
                parsing?: ({
                    functionTag?: string | undefined;
                    functionTemplate?: string | undefined;
                    resultParsing?: {
                        parserArg?: string[] | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } | undefined;
                } & {
                    functionTag?: string | undefined;
                    functionTemplate?: string | undefined;
                    resultParsing?: ({
                        parserArg?: string[] | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } & {
                        parserArg?: (string[] & string[] & { [K_7 in Exclude<keyof I["Spec"][number]["apis"][number]["parsing"]["resultParsing"]["parserArg"], keyof string[]>]: never; }) | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } & { [K_8 in Exclude<keyof I["Spec"][number]["apis"][number]["parsing"]["resultParsing"], keyof import("./service_api").BlockParser>]: never; }) | undefined;
                } & { [K_9 in Exclude<keyof I["Spec"][number]["apis"][number]["parsing"], keyof import("./service_api").Parsing>]: never; }) | undefined;
            } & { [K_10 in Exclude<keyof I["Spec"][number]["apis"][number], keyof import("./service_api").ServiceApi>]: never; })[] & { [K_11 in Exclude<keyof I["Spec"][number]["apis"], keyof {
                name?: string | undefined;
                blockParsing?: {
                    parserArg?: string[] | undefined;
                    parserFunc?: import("./service_api").parserFunc | undefined;
                } | undefined;
                computeUnits?: string | number | Long | undefined;
                enabled?: boolean | undefined;
                apiInterfaces?: {
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                }[] | undefined;
                category?: {
                    deterministic?: boolean | undefined;
                    local?: boolean | undefined;
                    subscription?: boolean | undefined;
                    stateful?: number | undefined;
                } | undefined;
                parsing?: {
                    functionTag?: string | undefined;
                    functionTemplate?: string | undefined;
                    resultParsing?: {
                        parserArg?: string[] | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } | undefined;
                } | undefined;
            }[]>]: never; }) | undefined;
            enabled?: boolean | undefined;
            reliabilityThreshold?: number | undefined;
            comparesHashes?: boolean | undefined;
            finalizationCriteria?: number | undefined;
            savedBlocks?: number | undefined;
            averageBlockTime?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K_12 in Exclude<keyof I["Spec"][number]["averageBlockTime"], keyof Long>]: never; }) | undefined;
            allowedBlockLagForQosSync?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K_13 in Exclude<keyof I["Spec"][number]["allowedBlockLagForQosSync"], keyof Long>]: never; }) | undefined;
            blockLastUpdated?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K_14 in Exclude<keyof I["Spec"][number]["blockLastUpdated"], keyof Long>]: never; }) | undefined;
        } & { [K_15 in Exclude<keyof I["Spec"][number], keyof Spec>]: never; })[] & { [K_16 in Exclude<keyof I["Spec"], keyof {
            index?: string | undefined;
            name?: string | undefined;
            apis?: {
                name?: string | undefined;
                blockParsing?: {
                    parserArg?: string[] | undefined;
                    parserFunc?: import("./service_api").parserFunc | undefined;
                } | undefined;
                computeUnits?: string | number | Long | undefined;
                enabled?: boolean | undefined;
                apiInterfaces?: {
                    interface?: string | undefined;
                    type?: string | undefined;
                    extraComputeUnits?: string | number | Long | undefined;
                }[] | undefined;
                category?: {
                    deterministic?: boolean | undefined;
                    local?: boolean | undefined;
                    subscription?: boolean | undefined;
                    stateful?: number | undefined;
                } | undefined;
                parsing?: {
                    functionTag?: string | undefined;
                    functionTemplate?: string | undefined;
                    resultParsing?: {
                        parserArg?: string[] | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } | undefined;
                } | undefined;
            }[] | undefined;
            enabled?: boolean | undefined;
            reliabilityThreshold?: number | undefined;
            comparesHashes?: boolean | undefined;
            finalizationCriteria?: number | undefined;
            savedBlocks?: number | undefined;
            averageBlockTime?: string | number | Long | undefined;
            allowedBlockLagForQosSync?: string | number | Long | undefined;
            blockLastUpdated?: string | number | Long | undefined;
        }[]>]: never; }) | undefined;
        pagination?: ({
            nextKey?: Uint8Array | undefined;
            total?: string | number | Long | undefined;
        } & {
            nextKey?: Uint8Array | undefined;
            total?: string | number | (Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long) => Long;
                and: (other: string | number | Long) => Long;
                compare: (other: string | number | Long) => number;
                comp: (other: string | number | Long) => number;
                divide: (divisor: string | number | Long) => Long;
                div: (divisor: string | number | Long) => Long;
                equals: (other: string | number | Long) => boolean;
                eq: (other: string | number | Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long) => boolean;
                gt: (other: string | number | Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long) => boolean;
                gte: (other: string | number | Long) => boolean;
                ge: (other: string | number | Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                eqz: () => boolean;
                lessThan: (other: string | number | Long) => boolean;
                lt: (other: string | number | Long) => boolean;
                lessThanOrEqual: (other: string | number | Long) => boolean;
                lte: (other: string | number | Long) => boolean;
                le: (other: string | number | Long) => boolean;
                modulo: (other: string | number | Long) => Long;
                mod: (other: string | number | Long) => Long;
                rem: (other: string | number | Long) => Long;
                multiply: (multiplier: string | number | Long) => Long;
                mul: (multiplier: string | number | Long) => Long;
                negate: () => Long;
                neg: () => Long;
                not: () => Long;
                countLeadingZeros: () => number;
                clz: () => number;
                countTrailingZeros: () => number;
                ctz: () => number;
                notEquals: (other: string | number | Long) => boolean;
                neq: (other: string | number | Long) => boolean;
                ne: (other: string | number | Long) => boolean;
                or: (other: string | number | Long) => Long;
                shiftLeft: (numBits: number | Long) => Long;
                shl: (numBits: number | Long) => Long;
                shiftRight: (numBits: number | Long) => Long;
                shr: (numBits: number | Long) => Long;
                shiftRightUnsigned: (numBits: number | Long) => Long;
                shru: (numBits: number | Long) => Long;
                shr_u: (numBits: number | Long) => Long;
                rotateLeft: (numBits: number | Long) => Long;
                rotl: (numBits: number | Long) => Long;
                rotateRight: (numBits: number | Long) => Long;
                rotr: (numBits: number | Long) => Long;
                subtract: (subtrahend: string | number | Long) => Long;
                sub: (subtrahend: string | number | Long) => Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long;
                xor: (other: string | number | Long) => Long;
            } & { [K_17 in Exclude<keyof I["pagination"]["total"], keyof Long>]: never; }) | undefined;
        } & { [K_18 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; }) | undefined;
    } & { [K_19 in Exclude<keyof I, keyof QueryAllSpecResponse>]: never; }>(object: I): QueryAllSpecResponse;
};
export declare const QueryShowAllChainsRequest: {
    encode(_: QueryShowAllChainsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryShowAllChainsRequest;
    fromJSON(_: any): QueryShowAllChainsRequest;
    toJSON(_: QueryShowAllChainsRequest): unknown;
    fromPartial<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(_: I): QueryShowAllChainsRequest;
};
export declare const QueryShowAllChainsResponse: {
    encode(message: QueryShowAllChainsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryShowAllChainsResponse;
    fromJSON(object: any): QueryShowAllChainsResponse;
    toJSON(message: QueryShowAllChainsResponse): unknown;
    fromPartial<I extends {
        chainNames?: string[] | undefined;
    } & {
        chainNames?: (string[] & string[] & { [K in Exclude<keyof I["chainNames"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "chainNames">]: never; }>(object: I): QueryShowAllChainsResponse;
};
export declare const QueryShowChainInfoRequest: {
    encode(message: QueryShowChainInfoRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryShowChainInfoRequest;
    fromJSON(object: any): QueryShowChainInfoRequest;
    toJSON(message: QueryShowChainInfoRequest): unknown;
    fromPartial<I extends {
        chainName?: string | undefined;
    } & {
        chainName?: string | undefined;
    } & { [K in Exclude<keyof I, "chainName">]: never; }>(object: I): QueryShowChainInfoRequest;
};
export declare const apiList: {
    encode(message: apiList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): apiList;
    fromJSON(object: any): apiList;
    toJSON(message: apiList): unknown;
    fromPartial<I extends {
        interface?: string | undefined;
        supportedApis?: string[] | undefined;
    } & {
        interface?: string | undefined;
        supportedApis?: (string[] & string[] & { [K in Exclude<keyof I["supportedApis"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof apiList>]: never; }>(object: I): apiList;
};
export declare const QueryShowChainInfoResponse: {
    encode(message: QueryShowChainInfoResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryShowChainInfoResponse;
    fromJSON(object: any): QueryShowChainInfoResponse;
    toJSON(message: QueryShowChainInfoResponse): unknown;
    fromPartial<I extends {
        chainID?: string | undefined;
        interfaces?: string[] | undefined;
        supportedApisInterfaceList?: {
            interface?: string | undefined;
            supportedApis?: string[] | undefined;
        }[] | undefined;
    } & {
        chainID?: string | undefined;
        interfaces?: (string[] & string[] & { [K in Exclude<keyof I["interfaces"], keyof string[]>]: never; }) | undefined;
        supportedApisInterfaceList?: ({
            interface?: string | undefined;
            supportedApis?: string[] | undefined;
        }[] & ({
            interface?: string | undefined;
            supportedApis?: string[] | undefined;
        } & {
            interface?: string | undefined;
            supportedApis?: (string[] & string[] & { [K_1 in Exclude<keyof I["supportedApisInterfaceList"][number]["supportedApis"], keyof string[]>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["supportedApisInterfaceList"][number], keyof apiList>]: never; })[] & { [K_3 in Exclude<keyof I["supportedApisInterfaceList"], keyof {
            interface?: string | undefined;
            supportedApis?: string[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, keyof QueryShowChainInfoResponse>]: never; }>(object: I): QueryShowChainInfoResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Parameters queries the parameters of the module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** Queries a Spec by id. */
    Spec(request: QueryGetSpecRequest): Promise<QueryGetSpecResponse>;
    /** Queries a list of Spec items. */
    SpecAll(request: QueryAllSpecRequest): Promise<QueryAllSpecResponse>;
    /** Queries a list of ShowAllChains items. */
    ShowAllChains(request: QueryShowAllChainsRequest): Promise<QueryShowAllChainsResponse>;
    /** Queries a list of ShowChainInfo items. */
    ShowChainInfo(request: QueryShowChainInfoRequest): Promise<QueryShowChainInfoResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    Spec(request: QueryGetSpecRequest): Promise<QueryGetSpecResponse>;
    SpecAll(request: QueryAllSpecRequest): Promise<QueryAllSpecResponse>;
    ShowAllChains(request: QueryShowAllChainsRequest): Promise<QueryShowAllChainsResponse>;
    ShowChainInfo(request: QueryShowChainInfoRequest): Promise<QueryShowChainInfoResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
