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
exports.LavaSDK = void 0;
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
        let { lavaEndpoint, rpcInterface } = options;
        // If lava endpoint is not set, use default
        lavaEndpoint = lavaEndpoint || default_1.DEFAULT_LAVA_ENDPOINT;
        // Validate chainID
        if (!(0, chains_1.isValidChainID)(chainID)) {
            throw errors_1.default.errChainIDUnsupported;
        }
        // If the rpc is not defined used the default for specified chainID
        rpcInterface = rpcInterface || (0, chains_1.fetchRpcInterface)(chainID);
        // Validate rpcInterface
        if (rpcInterface === "") {
            throw errors_1.default.errChainIDUnsupported;
        }
        this.chainID = chainID;
        this.rpcInterface = rpcInterface;
        this.privKey = privateKey;
        this.lavaEndpoint = lavaEndpoint;
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
    handleRpcRelay(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.rpcInterface === "rest") {
                    throw errors_1.default.errRPCRelayMethodNotSupported;
                }
                // Extract attributes from options
                // TODO change naming for optiosn atribute method both in RPC and REST
                const { method, params } = options;
                // get consumerProvider session
                const consumerProviderSession = yield this.getConsumerProviderSession();
                // get cuSum for specified method
                const cuSum = this.getCuSumForMethod(method);
                const data = this.generateRPCData(method, params);
                // Check if relay was initialized
                if (this.relayer instanceof Error) {
                    throw errors_1.default.errRelayerServiceNotInitialized;
                }
                // Construct send relay options
                const sendRelayOptions = {
                    data: data,
                    url: "",
                    connectionType: "GET", // temporary solution to spec changes - remove this when PRT-216 is fixed
                };
                // Send relay
                const relayResponse = yield this.relayer.sendRelay(sendRelayOptions, consumerProviderSession, cuSum);
                // Return relay in json format
                return this.decodeRelayResponse(relayResponse);
            }
            catch (err) {
                throw err;
            }
        });
    }
    handleRestRelay(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.rpcInterface !== "rest") {
                    throw errors_1.default.errRestRelayMethodNotSupported;
                }
                // Extract attributes from options
                const { method, url, data } = options;
                // get consumerProvider session
                const consumerProviderSession = yield this.getConsumerProviderSession();
                // get cuSum for specified method
                const cuSum = this.getCuSumForMethod(url);
                // Check if relay was initialized
                if (this.relayer instanceof Error) {
                    throw errors_1.default.errRelayerServiceNotInitialized;
                }
                let query = "?";
                for (const key in data) {
                    query = query + key + "=" + data[key] + "&";
                }
                // Construct send relay options
                const sendRelayOptions = {
                    data: query,
                    url: url,
                    connectionType: method,
                };
                // Send relay
                const relayResponse = yield this.relayer.sendRelay(sendRelayOptions, consumerProviderSession, cuSum);
                // Return relay in json format
                return this.decodeRelayResponse(relayResponse);
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Send relay to network through providers.
     *
     * @async
     * @param options The options to use for sending relay.
     *
     * @returns A promise that resolves when the relay response has been returned, and returns a JSON string
     *
     */
    sendRelay(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isRest(options))
                return yield this.handleRestRelay(options);
            return yield this.handleRpcRelay(options);
        });
    }
    generateRPCData(method, params) {
        const stringifyMethod = JSON.stringify(method);
        const stringifyParam = JSON.stringify(params);
        // TODO make id changable
        return ('{"jsonrpc": "2.0", "id": 1, "method": ' +
            stringifyMethod +
            ', "params": ' +
            stringifyParam +
            "}");
    }
    decodeRelayResponse(relayResponse) {
        // Decode relay response
        const dec = new TextDecoder();
        const decodedResponse = dec.decode(relayResponse.getData_asU8());
        return decodedResponse;
    }
    getCuSumForMethod(method) {
        // Check if activeSession was initialized
        if (this.activeSessionManager instanceof Error) {
            throw errors_1.default.errSessionNotInitialized;
        }
        // get cuSum for specified method
        const cuSum = this.activeSessionManager.getCuSumFromApi(method, this.chainID);
        // if cuSum is undefiend method does not exists in spec
        if (cuSum == undefined) {
            throw errors_1.default.errMethodNotSupported;
        }
        return cuSum;
    }
    getConsumerProviderSession() {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if state tracker was initialized
            if (this.stateTracker instanceof Error) {
                throw errors_1.default.errStateTrackerServiceNotInitialized;
            }
            // Check if state tracker was initialized
            if (this.account instanceof Error) {
                throw errors_1.default.errAccountNotInitialized;
            }
            // Check if activeSessionManager was initialized
            if (this.activeSessionManager instanceof Error) {
                throw errors_1.default.errSessionNotInitialized;
            }
            // Check if new epoch has started
            if (this.newEpochStarted()) {
                this.activeSessionManager = yield this.stateTracker.getSession(this.account, this.chainID, this.rpcInterface);
            }
            // Pick random provider and return
            return this.stateTracker.pickRandomProvider(this.activeSessionManager.PairingList);
        });
    }
    newEpochStarted() {
        // Check if activeSession was initialized
        if (this.activeSessionManager instanceof Error) {
            throw errors_1.default.errSessionNotInitialized;
        }
        // Get current date and time
        const now = new Date();
        // Return if new epoch has started
        return now.getTime() > this.activeSessionManager.NextEpochStart.getTime();
    }
}
exports.LavaSDK = LavaSDK;
function isRest(options) {
    return options.url !== undefined;
}
