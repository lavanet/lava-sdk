declare class StateTrackerErrors {
    static errPairingQueryServiceNotInitialized: Error;
    static errSpecQueryServiceNotInitialized: Error;
    static errEpochQueryServiceNotInitialized: Error;
    static errTendermintClientServiceNotInitialized: Error;
    static errLavaProvidersNotInitialized: Error;
    static errRelayerServiceNotInitialized: Error;
    static errNoValidProvidersForCurrentEpoch: Error;
    static errSpecNotFound: Error;
}
export default StateTrackerErrors;
