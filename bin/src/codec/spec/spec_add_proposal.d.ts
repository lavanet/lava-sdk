import Long from "long";
import _m0 from "protobufjs/minimal";
import { Spec } from "./spec";
export declare const protobufPackage = "lavanet.lava.spec";
export interface SpecAddProposal {
    title: string;
    description: string;
    specs: Spec[];
}
export declare const SpecAddProposal: {
    encode(message: SpecAddProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SpecAddProposal;
    fromJSON(object: any): SpecAddProposal;
    toJSON(message: SpecAddProposal): unknown;
    fromPartial<I extends {
        title?: string | undefined;
        description?: string | undefined;
        specs?: {
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
    } & {
        title?: string | undefined;
        description?: string | undefined;
        specs?: ({
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
                    parserArg?: (string[] & string[] & { [K in Exclude<keyof I["specs"][number]["apis"][number]["blockParsing"]["parserArg"], keyof string[]>]: never; }) | undefined;
                    parserFunc?: import("./service_api").parserFunc | undefined;
                } & { [K_1 in Exclude<keyof I["specs"][number]["apis"][number]["blockParsing"], keyof import("./service_api").BlockParser>]: never; }) | undefined;
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
                } & { [K_2 in Exclude<keyof I["specs"][number]["apis"][number]["computeUnits"], keyof Long>]: never; }) | undefined;
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
                    } & { [K_3 in Exclude<keyof I["specs"][number]["apis"][number]["apiInterfaces"][number]["extraComputeUnits"], keyof Long>]: never; }) | undefined;
                } & { [K_4 in Exclude<keyof I["specs"][number]["apis"][number]["apiInterfaces"][number], keyof import("./service_api").ApiInterface>]: never; })[] & { [K_5 in Exclude<keyof I["specs"][number]["apis"][number]["apiInterfaces"], keyof {
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
                } & { [K_6 in Exclude<keyof I["specs"][number]["apis"][number]["category"], keyof import("./service_api").SpecCategory>]: never; }) | undefined;
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
                        parserArg?: (string[] & string[] & { [K_7 in Exclude<keyof I["specs"][number]["apis"][number]["parsing"]["resultParsing"]["parserArg"], keyof string[]>]: never; }) | undefined;
                        parserFunc?: import("./service_api").parserFunc | undefined;
                    } & { [K_8 in Exclude<keyof I["specs"][number]["apis"][number]["parsing"]["resultParsing"], keyof import("./service_api").BlockParser>]: never; }) | undefined;
                } & { [K_9 in Exclude<keyof I["specs"][number]["apis"][number]["parsing"], keyof import("./service_api").Parsing>]: never; }) | undefined;
            } & { [K_10 in Exclude<keyof I["specs"][number]["apis"][number], keyof import("./service_api").ServiceApi>]: never; })[] & { [K_11 in Exclude<keyof I["specs"][number]["apis"], keyof {
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
            } & { [K_12 in Exclude<keyof I["specs"][number]["averageBlockTime"], keyof Long>]: never; }) | undefined;
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
            } & { [K_13 in Exclude<keyof I["specs"][number]["allowedBlockLagForQosSync"], keyof Long>]: never; }) | undefined;
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
            } & { [K_14 in Exclude<keyof I["specs"][number]["blockLastUpdated"], keyof Long>]: never; }) | undefined;
        } & { [K_15 in Exclude<keyof I["specs"][number], keyof Spec>]: never; })[] & { [K_16 in Exclude<keyof I["specs"], keyof {
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
    } & { [K_17 in Exclude<keyof I, keyof SpecAddProposal>]: never; }>(object: I): SpecAddProposal;
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
