"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SDKErrors {
}
SDKErrors.errAccountNotInitialized = new Error("Account was not initialized");
SDKErrors.errRelayerServiceNotInitialized = new Error("Relayer service was not initialized");
SDKErrors.errStateTrackerServiceNotInitialized = new Error("State Tracker service was not initialized");
SDKErrors.errSessionNotInitialized = new Error("Session was not initialized");
SDKErrors.errMethodNotSupportedNoCuSUM = new Error("Method not supported");
SDKErrors.errChainIDUnsupported = new Error("Invalid or unsupported chainID");
exports.default = SDKErrors;
