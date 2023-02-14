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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LavaProviders = void 0;
const default_1 = require("../config/default");
const types_1 = require("../types/types");
const lavaPairing_1 = require("../util/lavaPairing");
class LavaProviders {
    constructor(accountAddress, network) {
        this.index = 0;
        this.providers = [];
        this.network = network;
        this.accountAddress = accountAddress;
    }
    init(pairingListConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            var data;
            // if no pairing list config use default
            if (pairingListConfig == "") {
                data = yield this.initDefaultConfig();
            }
            else {
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
            this.providers = pairing;
        });
    }
    initDefaultConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(default_1.DEFAULT_LAVA_PAIRING_LIST);
            if (!response.ok) {
                throw new Error(`Unable to fetch pairing list: ${response.statusText}`);
            }
            const data = yield response.json();
            return data[this.network];
        });
    }
    initLocalConfig(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, lavaPairing_1.fetchLavaPairing)(path);
            return data[this.network];
        });
    }
    getNextProvider() {
        // TODO add some guard for empty
        const rpcAddress = this.providers[this.index];
        this.index = (this.index + 1) % this.providers.length;
        return rpcAddress;
    }
}
exports.LavaProviders = LavaProviders;
