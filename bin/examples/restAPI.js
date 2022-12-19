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
// TODO when we publish package we will import latest stable version and not using relative path
const sdk_1 = __importDefault(require("../src/sdk/sdk"));
/*
  In this example you will see how to use LavaSDK for sending rest API calls to the Juno Mainnet.
  Because the rest is not the default rpc interface for Juno Mainnet, we need to set it
  explicitly when initializing LavaSDK decentralize access

  You can find a list with all supported chains (https://github.com/lavanet/lava-sdk/blob/main/supportedChains.json)
*/
function runRestApiExample() {
    return __awaiter(this, void 0, void 0, function* () {
        const privKey = "private key from Juno Mainnet staked client";
        const chainID = "JUN1"; // chainID for Juno Mainnet
        // Create dAccess for Juno Mainnet
        // Default rpcInterface for Juno Mainnet is tendermintRPC
        // If you want to use rest it needs to be explicitly defined
        const lavaSDK = yield new sdk_1.default({
            privateKey: privKey,
            chainID: chainID,
            rpcInterface: "rest",
        });
        // Get latest block
        const latestBlock = yield lavaSDK.sendRelay({
            method: "GET",
            url: "/blocks/latest",
        });
        // Print latest block
        console.log(latestBlock);
        // Get latest validator-set
        const validators = yield lavaSDK.sendRelay({
            method: "GET",
            url: "/validatorsets/latest",
            data: {
                "pagination.count_total": true,
                "pagination.reverse": "true",
            },
        });
        // Print latest validator-set
        console.log(validators);
    });
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield runRestApiExample();
            console.log("Exiting program");
            process.exit(0);
        }
        catch (e) {
            console.log("ERROR", e);
        }
    });
})();
