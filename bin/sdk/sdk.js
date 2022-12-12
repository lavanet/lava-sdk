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
exports.createLavaSDK = void 0;
const wallet_1 = require("../wallet/wallet");
const errors_1 = __importDefault(require("./errors"));
const relayer_1 = __importDefault(require("../relayer/relayer"));
const stateTracker_1 = require("../stateTracker/stateTracker");
class LavaSDK {
    constructor(endpoint, chainID, rpcInterface, privKey) {
        this.chainID = chainID;
        this.rpcInterface = rpcInterface;
        this.privKey = privKey;
        this.lavaEndpoint = endpoint;
        this.account = errors_1.default.errAccountNotInitialized;
        this.relayer = errors_1.default.errRelayerServiceNotInitialized;
        this.stateTracker = errors_1.default.errStateTrackerServiceNotInitialized;
        this.activeSession = errors_1.default.errSessionNotInitialized;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // Initialize wallet
            // Create wallet
            const wallet = yield (0, wallet_1.createWallet)(this.privKey);
            // Get account from wallet
            this.account = yield wallet.getConsumerAccount();
            // print account detail
            wallet.printAccount(this.account);
            // Initialize state tracker
            // Create state tracker
            this.stateTracker = yield (0, stateTracker_1.createStateTracker)(this.lavaEndpoint);
            // Initialize relayer
            // Get pairing list for current epoch
            this.activeSession = yield this.stateTracker.getSession(this.account, this.chainID, this.rpcInterface);
            // Create relayer
            this.relayer = new relayer_1.default(this.chainID, this.privKey);
        });
    }
    sendRelay(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if account was initialized
                if (this.relayer instanceof Error) {
                    throw errors_1.default.errRelayerServiceNotInitialized;
                }
                // Check if state tracker was initialized
                if (this.stateTracker instanceof Error) {
                    throw errors_1.default.errStateTrackerServiceNotInitialized;
                }
                // Check if state tracker was initialized
                if (this.account instanceof Error) {
                    throw errors_1.default.errAccountNotInitialized;
                }
                // Check if activeSession was initialized
                if (this.activeSession instanceof Error) {
                    throw errors_1.default.errSessionNotInitialized;
                }
                // Check if new epoch has started
                if (this.newEpochStarted()) {
                    this.activeSession = yield this.stateTracker.getSession(this.account, this.chainID, this.rpcInterface);
                }
                const consumerProviderSession = this.stateTracker.pickRandomProvider(this.activeSession.PairingList);
                // Send relay
                const relayResponse = yield this.relayer.sendRelay(method, params, consumerProviderSession);
                console.log(this.activeSession);
                return relayResponse;
            }
            catch (err) {
                throw err;
            }
        });
    }
    newEpochStarted() {
        // Check if activeSession was initialized
        if (this.activeSession instanceof Error) {
            throw errors_1.default.errSessionNotInitialized;
        }
        const now = new Date();
        return now.getTime() > this.activeSession.NextEpochStart.getTime();
    }
}
function createLavaSDK(endpoint, chainID, rpcInterface, privKey) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create lavaSDK
        const lavaSDK = new LavaSDK(endpoint, chainID, rpcInterface, privKey);
        // Initialize lavaSDK
        yield lavaSDK.init();
        return lavaSDK;
    });
}
exports.createLavaSDK = createLavaSDK;
