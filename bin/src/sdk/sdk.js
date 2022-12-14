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
const wallet_1 = require("../wallet/wallet");
const errors_1 = __importDefault(require("./errors"));
const relayer_1 = __importDefault(require("../relayer/relayer"));
const stateTracker_1 = require("../stateTracker/stateTracker");
const chains_1 = require("../util/chains");
const default_1 = require("../config/default");
class LavaSDK {
    /**
     * Create Lava-SDK instance
     *
     * Use Lava-SDK for dAccess with a supported network. You can find a list of supported networks and their chain IDs at (url).
     *
     * @async
     * @param {LavaSDKOptions} options The options to use for initializing the LavaSDK.
     *
     * @returns A promise that resolves when the LavaSDK has been successfully initialized, returns LavaSDK object.
     */
    constructor(options) {
        // Extract attributes from options
        const { privateKey, chainID } = options;
        let { endpoint, rpcInterface } = options;
        // If lava endpoint is not set, use default
        endpoint = endpoint || default_1.DEFAULT_LAVA_ENDPOINT;
        // Validate chainID
        if (!(0, chains_1.isValidChainID)(chainID)) {
            throw errors_1.default.errChainIDUnsupported;
        }
        // If the rpc is not defined used the default for specified chainID
        rpcInterface = rpcInterface || (0, chains_1.fetchRpcInterface)(chainID);
        this.chainID = chainID;
        this.rpcInterface = rpcInterface;
        this.privKey = privateKey;
        this.lavaEndpoint = endpoint;
        this.account = errors_1.default.errAccountNotInitialized;
        this.relayer = errors_1.default.errRelayerServiceNotInitialized;
        this.stateTracker = errors_1.default.errStateTrackerServiceNotInitialized;
        this.activeSessionManager = errors_1.default.errSessionNotInitialized;
        return (() => __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            return this;
        }))();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create wallet
            const wallet = yield (0, wallet_1.createWallet)(this.privKey);
            // Get account from wallet
            this.account = yield wallet.getConsumerAccount();
            // Initialize state tracker
            // Create state tracker
            this.stateTracker = yield (0, stateTracker_1.createStateTracker)(this.lavaEndpoint);
            // Initialize relayer
            // Get pairing list for current epoch
            this.activeSessionManager = yield this.stateTracker.getSession(this.account, this.chainID, this.rpcInterface);
            // Create relayer
            this.relayer = new relayer_1.default(this.chainID, this.privKey);
        });
    }
    /**
     * Send relay to network through providers
     *
     * @async
     * @param {string} method - A string representing the RPC method name
     * @param {string[]} params - An array of strings representing the RPC parameters
     *
     * @returns A promise that resolves when the relay response has been returned, and returns a JSON string
     *
     */
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
                if (this.activeSessionManager instanceof Error) {
                    throw errors_1.default.errSessionNotInitialized;
                }
                // Check if new epoch has started
                if (this.newEpochStarted()) {
                    this.activeSessionManager = yield this.stateTracker.getSession(this.account, this.chainID, this.rpcInterface);
                }
                const consumerProviderSession = this.stateTracker.pickRandomProvider(this.activeSessionManager.PairingList);
                const cuSum = this.activeSessionManager.getCuSumFromApi(method);
                if (cuSum == undefined) {
                    throw errors_1.default.errMethodNotSupportedNoCuSUM;
                }
                // Send relay
                const relayResponse = yield this.relayer.sendRelay(method, params, consumerProviderSession, cuSum);
                // Decode relay response
                const dec = new TextDecoder();
                const decodedResponse = dec.decode(relayResponse.getData_asU8());
                // Return relay in json format
                return decodedResponse;
            }
            catch (err) {
                throw err;
            }
        });
    }
    newEpochStarted() {
        // Check if activeSession was initialized
        if (this.activeSessionManager instanceof Error) {
            throw errors_1.default.errSessionNotInitialized;
        }
        const now = new Date();
        return now.getTime() > this.activeSessionManager.NextEpochStart.getTime();
    }
}
exports.default = LavaSDK;
