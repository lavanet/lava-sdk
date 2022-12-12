"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StateTrackerErrors {
}
StateTrackerErrors.errQueryServiceNotInitialized = new Error("Query service was not initialized");
StateTrackerErrors.errEpochQueryServiceNotInitialized = new Error("Epoch query service was not initialized");
StateTrackerErrors.errTendermintClientServiceNotInitialized = new Error("Tendermint client service was not initialized");
StateTrackerErrors.errRelayerServiceNotInitialized = new Error("Relayer service was not initialized");
StateTrackerErrors.errNoValidProvidersForCurrentEpoch = new Error("No valid providers for current epoch");
exports.default = StateTrackerErrors;
