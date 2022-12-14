class SDKErrors {
  static errAccountNotInitialized: Error = new Error(
    "Account was not initialized"
  );
  static errRelayerServiceNotInitialized: Error = new Error(
    "Relayer service was not initialized"
  );
  static errStateTrackerServiceNotInitialized: Error = new Error(
    "State Tracker service was not initialized"
  );
  static errSessionNotInitialized: Error = new Error(
    "Session was not initialized"
  );
  static errMethodNotSupportedNoCuSUM: Error = new Error(
    "Method not supported"
  );
  static errChainIDUnsupported: Error = new Error(
    "Invalid or unsupported chainID"
  );
}

export default SDKErrors;
