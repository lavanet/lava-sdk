"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stateTracker_1 = require("./stateTracker");
const types_1 = require("../types/types");
it("Test convertRestApiName method", () => {
    const testCasses = [
        {
            name: "/lavanet/lava/spec/params",
            output: "/lavanet/lava/spec/params",
        },
        {
            name: "/lavanet/lava/pairing/clients/{chainID}",
            output: "/lavanet/lava/pairing/clients/[^/s]+",
        },
        {
            name: "/lavanet/lava/pairing/get_pairing/{chainID}/{client}",
            output: "/lavanet/lava/pairing/get_pairing/[^/s]+/[^/s]+",
        },
        {
            name: "/cosmos/staking/v1beta1/validators/{validator_addr}/delegations/{delegator_addr}/unbonding_delegation",
            output: "/cosmos/staking/v1beta1/validators/[^/s]+/delegations/[^/s]+/unbonding_delegation",
        },
        {
            name: "/lavanet/lava/pairing/verify_pairing/{chainID}/{client}/{provider}/{block}",
            output: "/lavanet/lava/pairing/verify_pairing/[^/s]+/[^/s]+/[^/s]+/[^/s]+",
        },
    ];
    const stateTracker = new stateTracker_1.StateTracker(null, null);
    testCasses.map((test) => {
        expect(stateTracker.convertRestApiName(test.name)).toBe(test.output);
    });
});
it("Test pickRandomProvider method", () => {
    const testCasses = [
        {
            maxComputeUnits: 10,
            UsedComputeUnits: 0,
            shouldFail: false,
        },
        {
            maxComputeUnits: 0,
            UsedComputeUnits: 10,
            shouldFail: true,
        },
        {
            maxComputeUnits: 10,
            UsedComputeUnits: 10,
            shouldFail: true,
        },
    ];
    const stateTracker = new stateTracker_1.StateTracker(null, null);
    testCasses.map((test) => {
        const consumerSessionWithProviderArr = [
            // default consumer session with provider with only compute units set
            new types_1.ConsumerSessionWithProvider("", [], new types_1.SingleConsumerSession(0, 0, 0, new types_1.Endpoint("", false, 0), 0, ""), test.maxComputeUnits, test.UsedComputeUnits, false),
        ];
        if (test.shouldFail) {
            expect(() => {
                stateTracker.pickRandomProvider(consumerSessionWithProviderArr);
            }).toThrowError();
        }
        else {
            expect(() => {
                stateTracker.pickRandomProvider(consumerSessionWithProviderArr);
            }).not.toThrowError();
        }
    });
});
