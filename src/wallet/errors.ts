class WalletErrors {
  static errWalletNotInitialized: Error = new Error(
    "Wallet was not initialized"
  );
  static errInvalidPrivateKey: Error = new Error("Invalid private key");
}

export default WalletErrors;
