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
const chains_1 = require("../util/chains");
const providers_1 = require("../lavaOverLava/providers");
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
        let { rpcInterface, pairingListConfig, network, geolocation } = options;
        // Validate chainID
        if (!(0, chains_1.isValidChainID)(chainID)) {
            throw errors_1.default.errChainIDUnsupported;
        }
        // If rpc is not defined use default for specified chainID
        rpcInterface = rpcInterface || (0, chains_1.fetchRpcInterface)(chainID);
        // Validate rpcInterface
        if (rpcInterface === "") {
            throw errors_1.default.errChainIDUnsupported;
        }
        // If network is not defined use default network
        network = network || default_1.DEFAULT_LAVA_PAIRING_NETWORK;
        // Validate network
        if (!(0, chains_1.isNetworkValid)(network)) {
            throw errors_1.default.errNetworkUnsupported;
        }
        // If geolocation is not defined use default geolocation
        geolocation = geolocation || default_1.DEFAULT_GEOLOCATION;
        // If lava pairing config not defined set as empty
        pairingListConfig = pairingListConfig || "";
        // Initialize local attributes
        this.chainID = chainID;
        this.rpcInterface = rpcInterface;
        this.privKey = privateKey;
        this.network = network;
        this.geolocation = geolocation;
        this.pairingListConfig = pairingListConfig;
        this.account = errors_1.default.errAccountNotInitialized;
        this.relayer = errors_1.default.errRelayerServiceNotInitialized;
        this.lavaProviders = errors_1.default.errLavaProvidersNotInitialized;
        this.activeSessionManager = errors_1.default.errSessionNotInitialized;
        // Init sdk
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
            // Init relayer for lava providers
            const lavaRelayer = new relayer_1.default(default_1.LAVA_CHAIN_ID, this.privKey);
            // Create new instance of lava providers
            const lavaProviders = yield new providers_1.LavaProviders(this.account.address, this.network, lavaRelayer, this.geolocation);
            // Init lava providers
            yield lavaProviders.init(this.pairingListConfig);
            // Save lava providers as local attribute
            this.lavaProviders = lavaProviders;
            // Get pairing list for current epoch
            this.activeSessionManager = yield this.lavaProviders.getSession(this.chainID, this.rpcInterface);
            // Create relayer for querying network
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
                const { method, params } = options;
                // Get consumerProvider session
                const consumerProviderSession = yield this.getConsumerProviderSession();
                // Get cuSum for specified method
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
                // Get consumerProvider session
                const consumerProviderSession = yield this.getConsumerProviderSession();
                // Get cuSum for specified method
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
            if (this.isRest(options))
                return yield this.handleRestRelay(options);
            return yield this.handleRpcRelay(options);
        });
    }
    generateRPCData(method, params) {
        const stringifyMethod = JSON.stringify(method);
        const stringifyParam = JSON.stringify(params, (key, value) => {
            if (typeof value === "bigint") {
                return value.toString();
            }
            return value;
        });
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
            // Check if lava providers were initialized
            if (this.lavaProviders instanceof Error) {
                throw errors_1.default.errLavaProvidersNotInitialized;
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
                this.activeSessionManager = yield this.lavaProviders.getSession(this.chainID, this.rpcInterface);
            }
            // Pick random provider and return
            return this.lavaProviders.pickRandomProvider(this.activeSessionManager.PairingList);
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
    isRest(options) {
        return options.url !== undefined;
    }
}
exports.LavaSDK = LavaSDK;
