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
}

export default SDKErrors;
