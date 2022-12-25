import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "lavanet.lava.spec";
export declare enum parserFunc {
    EMPTY = 0,
    /** PARSE_BY_ARG - means parameters are ordered and flat expected areguments are: [param index] (example: PARAMS: [<#BlockNum>,"banana"]) */
    PARSE_BY_ARG = 1,
    /** PARSE_CANONICAL - means parameters are ordered and one of them has named properties, expected areguments are: [param index to object,propname in object] (example: PARAMS: ["banana",{propname:<#BlockNum>}]) */
    PARSE_CANONICAL = 2,
    /** PARSE_DICTIONARY - means parameters are named, expected arguments are [prop_name,separator] (example: PARAMS: {propname:<#BlockNum>,prop2:"banana"}) */
    PARSE_DICTIONARY = 3,
    /** PARSE_DICTIONARY_OR_ORDERED - means parameters are named expected arguments are [prop_name,separator,parameter order if not found] */
    PARSE_DICTIONARY_OR_ORDERED = 4,
    /** DEFAULT - means parameters are non related to block, and should fetch latest block */
    DEFAULT = 5,
    UNRECOGNIZED = -1
}
export declare function parserFuncFromJSON(object: any): parserFunc;
export declare function parserFuncToJSON(object: parserFunc): string;
export interface ServiceApi {
    name: string;
    blockParsing?: BlockParser;
    computeUnits: Long;
    enabled: boolean;
    apiInterfaces: ApiInterface[];
    category?: SpecCategory;
    parsing?: Parsing;
}
export interface Parsing {
    functionTag: string;
    functionTemplate: string;
    resultParsing?: BlockParser;
}
export interface ApiInterface {
    interface: string;
    type: string;
    extraComputeUnits: Long;
}
export interface BlockParser {
    parserArg: string[];
    parserFunc: parserFunc;
}
export interface SpecCategory {
    deterministic: boolean;
    local: boolean;
    subscription: boolean;
    stateful: number;
}
export declare const ServiceApi: {
    encode(message: ServiceApi, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ServiceApi;
    fromJSON(object: any): ServiceApi;
    toJSON(message: ServiceApi): unknown;
    fromPartial<I extends {
        name?: string | undefined;
        blockParsing?: {
            parserArg?: string[] | undefined;
            parserFunc?: parserFunc | undefined;
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
                parserFunc?: parserFunc | undefined;
            } | undefined;
        } | undefined;
    } & {
        name?: string | undefined;
        blockParsing?: ({
            parserArg?: string[] | undefined;
            parserFunc?: parserFunc | undefined;
        } & {
            parserArg?: (string[] & string[] & { [K in Exclude<keyof I["blockParsing"]["parserArg"], keyof string[]>]: never; }) | undefined;
            parserFunc?: parserFunc | undefined;
        } & { [K_1 in Exclude<keyof I["blockParsing"], keyof BlockParser>]: never; }) | undefined;
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
        } & { [K_2 in Exclude<keyof I["computeUnits"], keyof Long>]: never; }) | undefined;
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
            } & { [K_3 in Exclude<keyof I["apiInterfaces"][number]["extraComputeUnits"], keyof Long>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I["apiInterfaces"][number], keyof ApiInterface>]: never; })[] & { [K_5 in Exclude<keyof I["apiInterfaces"], keyof {
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
        } & { [K_6 in Exclude<keyof I["category"], keyof SpecCategory>]: never; }) | undefined;
        parsing?: ({
            functionTag?: string | undefined;
            functionTemplate?: string | undefined;
            resultParsing?: {
                parserArg?: string[] | undefined;
                parserFunc?: parserFunc | undefined;
            } | undefined;
        } & {
            functionTag?: string | undefined;
            functionTemplate?: string | undefined;
            resultParsing?: ({
                parserArg?: string[] | undefined;
                parserFunc?: parserFunc | undefined;
            } & {
                parserArg?: (string[] & string[] & { [K_7 in Exclude<keyof I["parsing"]["resultParsing"]["parserArg"], keyof string[]>]: never; }) | undefined;
                parserFunc?: parserFunc | undefined;
            } & { [K_8 in Exclude<keyof I["parsing"]["resultParsing"], keyof BlockParser>]: never; }) | undefined;
        } & { [K_9 in Exclude<keyof I["parsing"], keyof Parsing>]: never; }) | undefined;
    } & { [K_10 in Exclude<keyof I, keyof ServiceApi>]: never; }>(object: I): ServiceApi;
};
export declare const Parsing: {
    encode(message: Parsing, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Parsing;
    fromJSON(object: any): Parsing;
    toJSON(message: Parsing): unknown;
    fromPartial<I extends {
        functionTag?: string | undefined;
        functionTemplate?: string | undefined;
        resultParsing?: {
            parserArg?: string[] | undefined;
            parserFunc?: parserFunc | undefined;
        } | undefined;
    } & {
        functionTag?: string | undefined;
        functionTemplate?: string | undefined;
        resultParsing?: ({
            parserArg?: string[] | undefined;
            parserFunc?: parserFunc | undefined;
        } & {
            parserArg?: (string[] & string[] & { [K in Exclude<keyof I["resultParsing"]["parserArg"], keyof string[]>]: never; }) | undefined;
            parserFunc?: parserFunc | undefined;
        } & { [K_1 in Exclude<keyof I["resultParsing"], keyof BlockParser>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof Parsing>]: never; }>(object: I): Parsing;
};
export declare const ApiInterface: {
    encode(message: ApiInterface, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ApiInterface;
    fromJSON(object: any): ApiInterface;
    toJSON(message: ApiInterface): unknown;
    fromPartial<I extends {
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
        } & { [K in Exclude<keyof I["extraComputeUnits"], keyof Long>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof ApiInterface>]: never; }>(object: I): ApiInterface;
};
export declare const BlockParser: {
    encode(message: BlockParser, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BlockParser;
    fromJSON(object: any): BlockParser;
    toJSON(message: BlockParser): unknown;
    fromPartial<I extends {
        parserArg?: string[] | undefined;
        parserFunc?: parserFunc | undefined;
    } & {
        parserArg?: (string[] & string[] & { [K in Exclude<keyof I["parserArg"], keyof string[]>]: never; }) | undefined;
        parserFunc?: parserFunc | undefined;
    } & { [K_1 in Exclude<keyof I, keyof BlockParser>]: never; }>(object: I): BlockParser;
};
export declare const SpecCategory: {
    encode(message: SpecCategory, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SpecCategory;
    fromJSON(object: any): SpecCategory;
    toJSON(message: SpecCategory): unknown;
    fromPartial<I extends {
        deterministic?: boolean | undefined;
        local?: boolean | undefined;
        subscription?: boolean | undefined;
        stateful?: number | undefined;
    } & {
        deterministic?: boolean | undefined;
        local?: boolean | undefined;
        subscription?: boolean | undefined;
        stateful?: number | undefined;
    } & { [K in Exclude<keyof I, keyof SpecCategory>]: never; }>(object: I): SpecCategory;
};
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
