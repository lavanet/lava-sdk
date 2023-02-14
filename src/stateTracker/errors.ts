class StateTrackerErrors {
  static errLavaProvidersNotInitialized: Error = new Error(
    "Lava providers not initialized"
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
