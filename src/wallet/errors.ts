class WalletErrors {
    static errWalletNotInitialized: Error = new Error(
        "Wallet was not initialized"
    )
    static errInvalidMnemonic: Error = new Error(
        "Invalid mnemonic format"
    )
}

export default WalletErrors