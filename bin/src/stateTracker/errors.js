"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StateTrackerErrors {
}
StateTrackerErrors.errPairingQueryServiceNotInitialized = new Error("Pairing query service was not initialized");
StateTrackerErrors.errSpecQueryServiceNotInitialized = new Error("Spec query service was not initialized");
StateTrackerErrors.errEpochQueryServiceNotInitialized = new Error("Epoch query service was not initialized");
StateTrackerErrors.errTendermintClientServiceNotInitialized = new Error("Tendermint client service was not initialized");
StateTrackerErrors.errRelayerServiceNotInitialized = new Error("Relayer service was not initialized");
StateTrackerErrors.errNoValidProvidersForCurrentEpoch = new Error("No valid providers for current epoch");
StateTrackerErrors.errSpecNotFound = new Error("Spec not found");
exports.default = StateTrackerErrors;
