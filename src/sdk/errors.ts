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
  static errMethodNotSupported: Error = new Error("Method not supported");
  static errChainIDUnsupported: Error = new Error(
    "Invalid or unsupported chainID"
  );
  static errRPCRelayMethodNotSupported: Error = new Error(
    "SendRelay not supported if the SDK is initialized with rest rpcInterface, use sendRestRelay method"
  );
  static errRestRelayMethodNotSupported: Error = new Error(
    "SendRestRelay not supported if the SDK is initialized with RPC rpcInterface (tendermintRPC/jsonRPC), use sendRelay method"
  );
}

export default SDKErrors;
