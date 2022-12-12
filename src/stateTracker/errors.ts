class StateTrackerErrors {
  static errPairingQueryServiceNotInitialized: Error = new Error(
    "Pairing query service was not initialized"
  );
  static errSpecQueryServiceNotInitialized: Error = new Error(
    "Pairing query service was not initialized"
  );
  static errEpochQueryServiceNotInitialized: Error = new Error(
    "Epoch query service was not initialized"
  );
  static errTendermintClientServiceNotInitialized: Error = new Error(
    "Tendermint client service was not initialized"
  );
  static errRelayerServiceNotInitialized: Error = new Error(
    "Relayer service was not initialized"
  );
  static errNoValidProvidersForCurrentEpoch: Error = new Error(
    "No valid providers for current epoch"
  );
  static errSpecNotFound: Error = new Error("Spec not found");
}

export default StateTrackerErrors;
