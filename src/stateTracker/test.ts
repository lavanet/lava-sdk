import { StateTracker } from "./stateTracker";
import {
  ConsumerSessionWithProvider,
  Endpoint,
  SingleConsumerSession,
} from "../types/types";

it("Validate convertRestApiName method", () => {
  const testCasses: { name: string; output: string }[] = [
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
      output:
        "/cosmos/staking/v1beta1/validators/[^/s]+/delegations/[^/s]+/unbonding_delegation",
    },
    {
      name: "/lavanet/lava/pairing/verify_pairing/{chainID}/{client}/{provider}/{block}",
      output:
        "/lavanet/lava/pairing/verify_pairing/[^/s]+/[^/s]+/[^/s]+/[^/s]+",
    },
  ];

  const stateTracker = new StateTracker();

  testCasses.map((test) => {
    expect(stateTracker.convertRestApiName(test.name)).toBe(test.output);
  });
});

it("Validate pickRandomProvider method", () => {
  const testCasses: {
    maxComputeUnits: number;
    UsedComputeUnits: number;
    shouldFail: boolean;
  }[] = [
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

  const stateTracker = new StateTracker();

  testCasses.map((test) => {
    const consumerSessionWithProviderArr = [
      // default consumer session with provider with only compute units set
      new ConsumerSessionWithProvider(
        "",
        [],
        new SingleConsumerSession(0, 0, 0, new Endpoint("", false, 0), 0, ""),
        test.maxComputeUnits,
        test.UsedComputeUnits,
        false
      ),
    ];
    if (test.shouldFail) {
      expect(() => {
        stateTracker.pickRandomProvider(consumerSessionWithProviderArr);
      }).toThrowError();
    } else {
      expect(() => {
        stateTracker.pickRandomProvider(consumerSessionWithProviderArr);
      }).not.toThrowError();
    }
  });
});
