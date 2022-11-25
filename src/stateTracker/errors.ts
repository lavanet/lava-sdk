class StateTrackerErrors {
  static errQueryServiceNotInitialized: Error = new Error(
    "Query service was not initialized"
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
}

export default StateTrackerErrors;
