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
exports.LavaEtherProvider = void 0;
const ethers_1 = require("ethers");
const sdk_1 = require("../sdk/sdk");
class LavaEtherProvider extends ethers_1.JsonRpcProvider {
    constructor(options) {
        super(undefined);
        this.lavaSDK = null;
        return (() => __awaiter(this, void 0, void 0, function* () {
            this.lavaSDK = yield new sdk_1.LavaSDK({
                privateKey: options.privKey,
                chainID: options.chainID,
                pairingListConfig: options.pairingListConfig,
            });
            return this;
        }))();
    }
    send(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let stringParams = [];
            if (Array.isArray(params)) {
                stringParams = params.map((param) => String(param));
            }
            else if (typeof params === "object") {
                stringParams = Object.values(params).map((param) => String(param));
            }
            console.log("Sending ", method + " to Ethereum Mainnet");
            if (this.lavaSDK == null) {
                throw console.error("test");
            }
            const response = yield this.lavaSDK.sendRelay({
                method: method,
                params: stringParams,
            });
            const parsedResponse = JSON.parse(response);
            return parsedResponse.result;
        });
    }
}
exports.LavaEtherProvider = LavaEtherProvider;
