"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWallet = void 0;
const amino_1 = require("@cosmjs/amino");
const errors_1 = __importDefault(require("./errors"));
const logger_1 = __importDefault(require("../logger/logger"));
const encoding_1 = require("@cosmjs/encoding");
// prefix for lava accounts
const lavaPrefix = "lava@";
class LavaWallet {
    constructor(privKey) {
        this.privKey = privKey;
        this.wallet = errors_1.default.errWalletNotInitialized;
    }
    // Initialize client
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.wallet = yield amino_1.Secp256k1Wallet.fromKey((0, encoding_1.fromHex)(this.privKey), lavaPrefix);
            }
            catch (err) {
                throw errors_1.default.errInvalidPrivateKey;
            }
        });
    }
    // Get consumer account from the wallet
    getConsumerAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if wallet was initialized
                if (this.wallet instanceof Error) {
                    throw errors_1.default.errWalletNotInitialized;
                }
                // Fetch account
                const account = yield this.wallet.getAccounts();
                // Check if zero account exists
                if (account[0] == undefined) {
                    throw errors_1.default.errZeroAccountDoesNotExists;
                }
                // Return zero account from wallet
                return account[0];
            }
            catch (err) {
                throw err;
            }
        });
    }
    // Print account details
    printAccount(AccountData) {
        logger_1.default.info("INFO:");
        logger_1.default.info("Address: " + AccountData.address);
        logger_1.default.info("Public key: " + AccountData.pubkey);
        logger_1.default.emptyLine();
    }
}
function createWallet(privKey) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create lavaSDK
        const wallet = new LavaWallet(privKey);
        // Initialize wallet
        yield wallet.init();
        return wallet;
    });
}
exports.createWallet = createWallet;
