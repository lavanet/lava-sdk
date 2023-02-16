"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProvidersErrors {
}
ProvidersErrors.errLavaProvidersNotInitialized = new Error("Lava providers not initialized");
ProvidersErrors.errRelayerServiceNotInitialized = new Error("Relayer service was not initialized");
ProvidersErrors.errNoValidProvidersForCurrentEpoch = new Error("No valid providers for current epoch");
ProvidersErrors.errSpecNotFound = new Error("Spec not found");
exports.default = ProvidersErrors;
