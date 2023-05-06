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
exports.LavaProviders = void 0;
const default_1 = require("../config/default");
const types_1 = require("../types/types");
const lavaPairing_1 = require("../util/lavaPairing");
const errors_1 = __importDefault(require("./errors"));
class LavaProviders {
    constructor(accountAddress, network, relayer, geolocation) {
        this.index = 0;
        this.providers = [];
        this.network = network;
        this.accountAddress = accountAddress;
        this.relayer = relayer;
        this.geolocation = geolocation;
    }
    init(pairingListConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            // if no pairing list config use default
            if (pairingListConfig == "") {
                data = yield this.initDefaultConfig();
            }
            else {
                // Else use local config file
                data = yield this.initLocalConfig(pairingListConfig);
            }
            // Initialize ConsumerSessionWithProvider array
            const pairing = [];
            for (const provider of data) {
                const singleConsumerSession = new types_1.SingleConsumerSession(0, // cuSum
                0, // latestRelayCuSum
                1, // relayNumber
                new types_1.Endpoint(provider.rpcAddress, true, 0), -1, //invalid epoch
                provider.publicAddress);
                // Create a new pairing object
                const newPairing = new types_1.ConsumerSessionWithProvider(this.accountAddress, [], singleConsumerSession, 100000, // invalid max cu
                0, // used compute units
                false);
                // Add newly created pairing in the pairing list
                pairing.push(newPairing);
            }
            // Save providers as local attribute
            this.providers = pairing;
        });
    }
    initDefaultConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch config from github repo
            const response = yield fetch(default_1.DEFAULT_LAVA_PAIRING_LIST);
            // Validate response
            if (!response.ok) {
                throw new Error(`Unable to fetch pairing list: ${response.statusText}`);
            }
            try {
                // Parse response
                const data = yield response.json();
                // Return data array
                return data[this.network][this.geolocation];
            }
            catch (error) {
                throw errors_1.default.errConfigNotValidJson;
            }
        });
    }
    initLocalConfig(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, lavaPairing_1.fetchLavaPairing)(path);
            return data[this.network][this.geolocation];
        });
    }
    // GetNextLavaProvider return lava providers used for fetching epoch
    // in round-robin fashion
    GetNextLavaProvider() {
        if (this.providers.length == 0) {
            throw errors_1.default.errNoProviders;
        }
        const rpcAddress = this.providers[this.index];
        this.index = (this.index + 1) % this.providers.length;
        return rpcAddress;
    }
    // getSession returns providers for current epoch
    getSession(chainID, rpcInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.providers == null) {
                    throw errors_1.default.errLavaProvidersNotInitialized;
                }
                // Fetch lava provider which will be used for fetching pairing list
                const lavaRPCEndpoint = this.GetNextLavaProvider();
                // Create request for getServiceApis method
                const apis = yield this.getServiceApis(lavaRPCEndpoint, chainID, rpcInterface);
                // Create pairing request for getPairing method
                const pairingRequest = {
                    chainID: chainID,
                    client: this.accountAddress,
                };
                // Get pairing from the chain
                const pairingResponse = yield this.getPairingFromChain(lavaRPCEndpoint, pairingRequest);
                // Set when will next epoch start
                const nextEpochStart = new Date();
                nextEpochStart.setSeconds(nextEpochStart.getSeconds() +
                    parseInt(pairingResponse.time_left_to_next_pairing));
                // Extract providers from pairing response
                const providers = pairingResponse.providers;
                // Initialize ConsumerSessionWithProvider array
                const pairing = [];
                // Create request for getting userEntity
                const userEntityRequest = {
                    address: this.accountAddress,
                    chainID: chainID,
                    block: pairingResponse.current_epoch,
                };
                // Fetch max compute units
                const maxcu = yield this.getMaxCuForUser(lavaRPCEndpoint, userEntityRequest);
                // Iterate over providers to populate pairing list
                for (const provider of providers) {
                    // Skip providers with no endpoints
                    if (provider.endpoints.length == 0) {
                        continue;
                    }
                    // Initialize relevantEndpoints array
                    const relevantEndpoints = [];
                    // Only take into account endpoints that use the same api interface
                    // And geolocation
                    for (const endpoint of provider.endpoints) {
                        if (endpoint.useType == rpcInterface &&
                            endpoint.geolocation == this.geolocation) {
                            const convertedEndpoint = new types_1.Endpoint(endpoint.iPPORT, true, 0);
                            relevantEndpoints.push(convertedEndpoint);
                        }
                    }
                    // Skip providers with no relevant endpoints
                    if (relevantEndpoints.length == 0) {
                        continue;
                    }
                    const singleConsumerSession = new types_1.SingleConsumerSession(0, // cuSum
                    0, // latestRelayCuSum
                    1, // relayNumber
                    relevantEndpoints[0], parseInt(pairingResponse.current_epoch), provider.address);
                    // Create a new pairing object
                    const newPairing = new types_1.ConsumerSessionWithProvider(this.accountAddress, relevantEndpoints, singleConsumerSession, maxcu, 0, // used compute units
                    false);
                    // Add newly created pairing in the pairing list
                    pairing.push(newPairing);
                }
                // Create session object
                const sessionManager = new types_1.SessionManager(pairing, nextEpochStart, apis);
                return sessionManager;
            }
            catch (err) {
                throw err;
            }
        });
    }
    pickRandomProvider(providers) {
        // Remove providers which does not match criteria
        const validProviders = providers.filter((item) => item.MaxComputeUnits > item.UsedComputeUnits);
        if (validProviders.length === 0) {
            throw errors_1.default.errNoValidProvidersForCurrentEpoch;
        }
        // Pick random provider
        const random = Math.floor(Math.random() * validProviders.length);
        return validProviders[random];
    }
    getPairingFromChain(lavaRPCEndpoint, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                connectionType: "GET",
                url: "/lavanet/lava/pairing/get_pairing/" +
                    request.chainID +
                    "/" +
                    request.client,
                data: "",
            };
            const jsonResponse = yield this.SendRelayWithRetry(options, lavaRPCEndpoint, "rest");
            if (jsonResponse.providers == undefined) {
                throw errors_1.default.errProvidersNotFound;
            }
            return jsonResponse;
        });
    }
    getMaxCuForUser(lavaRPCEndpoint, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                connectionType: "GET",
                url: "/lavanet/lava/pairing/user_entry/" +
                    request.address +
                    "/" +
                    request.chainID,
                data: "?block=" + request.block,
            };
            const jsonResponse = yield this.SendRelayWithRetry(options, lavaRPCEndpoint, "rest");
            if (jsonResponse.maxCU == undefined) {
                throw errors_1.default.errMaxCuNotFound;
            }
            // return maxCu from userEntry
            return parseInt(jsonResponse.maxCU);
        });
    }
    getServiceApis(lavaRPCEndpoint, chainID, rpcInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                connectionType: "GET",
                url: "/lavanet/lava/spec/spec/" + chainID,
                data: "",
            };
            const jsonResponse = yield this.SendRelayWithRetry(options, lavaRPCEndpoint, "rest");
            if (jsonResponse.Spec == undefined) {
                throw errors_1.default.errSpecNotFound;
            }
            const apis = new Map();
            // Extract apis from response
            for (const element of jsonResponse.Spec.apis) {
                for (const apiInterface of element.api_interfaces) {
                    // Skip if interface which does not match
                    if (apiInterface.interface != rpcInterface)
                        continue;
                    if (apiInterface.interface == "rest") {
                        // handle REST apis
                        const name = this.convertRestApiName(element.name);
                        apis.set(name, parseInt(element.compute_units));
                    }
                    else {
                        // Handle RPC apis
                        apis.set(element.name, parseInt(element.compute_units));
                    }
                }
            }
            return apis;
        });
    }
    convertRestApiName(name) {
        const regex = /\{\s*[^}]+\s*\}/g;
        return name.replace(regex, "[^/s]+");
    }
    SendRelayWithRetry(options, lavaRPCEndpoint, rpcInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                if (this.relayer == null) {
                    throw errors_1.default.errNoRelayer;
                }
                // For now we have hardcode relay cu
                const relayCu = 10;
                response = yield this.relayer.sendRelay(options, lavaRPCEndpoint, relayCu, rpcInterface);
            }
            catch (error) {
                // If error is instace of Error
                if (error instanceof Error) {
                    // If error is not old blokc height throw and error
                    // Extract current block height from error
                    const currentBlockHeight = this.extractBlockNumberFromError(error);
                    // If current block height equal nill throw an error
                    if (currentBlockHeight == null) {
                        throw error;
                    }
                    // Save current block height
                    lavaRPCEndpoint.Session.PairingEpoch = parseInt(currentBlockHeight);
                    // Validate that relayer exists
                    if (this.relayer == null) {
                        throw errors_1.default.errNoRelayer;
                    }
                    // Retry same relay with added block height
                    try {
                        response = yield this.relayer.sendRelay(options, lavaRPCEndpoint, 10, rpcInterface);
                    }
                    catch (error) {
                        throw error;
                    }
                }
            }
            // Validate that response is not undefined
            if (response == undefined) {
                return "";
            }
            // Decode response
            const dec = new TextDecoder();
            const decodedResponse = dec.decode(response.getData_asU8());
            // Parse response
            const jsonResponse = JSON.parse(decodedResponse);
            // Return response
            return jsonResponse;
        });
    }
    extractBlockNumberFromError(error) {
        let currentBlockHeightRegex = /current epoch: (\d+)/;
        let match = error.message.match(currentBlockHeightRegex);
        // Retry with new error
        if (match == null) {
            currentBlockHeightRegex = /current lava block Value:(\d+)/;
            match = error.message.match(currentBlockHeightRegex);
            return match ? match[1] : null;
        }
        return match ? match[1] : null;
    }
}
exports.LavaProviders = LavaProviders;
