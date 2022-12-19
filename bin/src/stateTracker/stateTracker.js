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
exports.createStateTracker = exports.StateTracker = void 0;
const stargate_1 = require("@cosmjs/stargate");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const query_1 = require("../codec/pairing/query");
const query_2 = require("../codec/spec/query");
const types_1 = require("../types/types");
const errors_1 = __importDefault(require("./errors"));
const errors_2 = __importDefault(require("./errors"));
class StateTracker {
    constructor() {
        this.pairingQueryService =
            errors_1.default.errPairingQueryServiceNotInitialized;
        this.specQueryService = errors_1.default.errSpecQueryServiceNotInitialized;
        this.tendermintClient =
            errors_1.default.errTendermintClientServiceNotInitialized;
    }
    init(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const tmClient = yield tendermint_rpc_1.Tendermint34Client.connect(endpoint);
            const queryClient = new stargate_1.QueryClient(tmClient);
            const rpcClient = (0, stargate_1.createProtobufRpcClient)(queryClient);
            this.pairingQueryService = new query_1.QueryClientImpl(rpcClient);
            this.specQueryService = new query_2.QueryClientImpl(rpcClient);
            this.tendermintClient = tmClient;
        });
    }
    // Get session return providers for current epoch
    getSession(account, chainID, rpcInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.tendermintClient instanceof Error) {
                    throw errors_1.default.errTendermintClientServiceNotInitialized;
                }
                // Create request for getServiceApis method
                const queryGetSpecRequest = {
                    ChainID: chainID,
                };
                const apis = yield this.getServiceApis(queryGetSpecRequest, rpcInterface);
                // Create pairing request for getPairing method
                const pairingRequest = {
                    chainID: chainID,
                    client: account.address,
                };
                // Get pairing from the chain
                const pairingResponse = yield this.getPairingFromChain(pairingRequest);
                // Set when will next epoch start
                const nextEpochStart = new Date();
                nextEpochStart.setSeconds(nextEpochStart.getSeconds() +
                    pairingResponse.timeLeftToNextPairing.getLowBits());
                // Extract providers from pairing response
                const providers = pairingResponse.providers;
                // Initialize ConsumerSessionWithProvider array
                const pairing = [];
                // create request for getting userEntity
                const userEntityRequest = {
                    address: account.address,
                    chainID: chainID,
                    block: pairingResponse.currentEpoch,
                };
                // fetch max compute units
                const maxcu = yield this.getMaxCuForUser(userEntityRequest);
                //Iterate over providers to populate pairing list
                for (const provider of providers) {
                    // Skip providers with no endpoints
                    if (provider.endpoints.length == 0) {
                        continue;
                    }
                    // Initialize relevantEndpoints array
                    const relevantEndpoints = [];
                    //only take into account endpoints that use the same api interface
                    for (const endpoint of provider.endpoints) {
                        if (endpoint.useType == rpcInterface) {
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
                    relevantEndpoints[0], pairingResponse.currentEpoch.getLowBits(), provider.address);
                    // Create a new pairing object
                    const newPairing = new types_1.ConsumerSessionWithProvider(account.address, relevantEndpoints, singleConsumerSession, maxcu, 0, // used compute units
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
            throw errors_2.default.errNoValidProvidersForCurrentEpoch;
        }
        // Pick random provider
        const random = Math.floor(Math.random() * validProviders.length);
        return validProviders[random];
    }
    getPairingFromChain(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if query service was initialized
            if (this.pairingQueryService instanceof Error) {
                throw errors_1.default.errPairingQueryServiceNotInitialized;
            }
            // Get pairing from the chain
            const queryResult = yield this.pairingQueryService.GetPairing(request);
            return queryResult;
        });
    }
    getMaxCuForUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if query service was initialized
            if (this.pairingQueryService instanceof Error) {
                throw errors_1.default.errPairingQueryServiceNotInitialized;
            }
            // Get pairing from the chain
            const queryResult = yield this.pairingQueryService.UserEntry(request);
            // return maxCu from userEntry
            return queryResult.maxCU.low;
        });
    }
    getServiceApis(request, rpcInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if query service was initialized
            if (this.specQueryService instanceof Error) {
                throw errors_1.default.errSpecQueryServiceNotInitialized;
            }
            // Get spec from the chain
            const queryResult = yield this.specQueryService.Spec(request);
            if (queryResult.Spec == undefined) {
                throw errors_1.default.errSpecNotFound;
            }
            const apis = new Map();
            // Extract apis from response
            for (const element of queryResult.Spec.apis) {
                for (const apiInterface of element.apiInterfaces) {
                    // Skip if interface which does not match
                    if (apiInterface.interface != rpcInterface)
                        continue;
                    if (apiInterface.interface == "rest") {
                        // handle REST apis
                        const name = this.convertRestApiName(element.name);
                        apis.set(name, element.computeUnits.getLowBits());
                    }
                    else {
                        // Handle RPC apis
                        apis.set(element.name, element.computeUnits.getLowBits());
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
}
exports.StateTracker = StateTracker;
function createStateTracker(endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        const stateTracker = new StateTracker();
        yield stateTracker.init(endpoint);
        return stateTracker;
    });
}
exports.createStateTracker = createStateTracker;
