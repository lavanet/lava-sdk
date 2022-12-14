"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WalletErrors {
}
WalletErrors.errWalletNotInitialized = new Error("Wallet was not initialized");
WalletErrors.errInvalidPrivateKey = new Error("Invalid private key");
exports.default = WalletErrors;
