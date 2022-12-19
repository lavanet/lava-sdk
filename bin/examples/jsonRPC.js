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
  In this example you will see how to use LavaSDK for sending jsonRPC calls to the Ethereum Mainnet.
  Because the jsonRPC is the default rpc interface for Ethereum Mainnet, we don't need to set it
  explicitly when initializing LavaSDK decentralize access

  You can find a list with all supported chains (https://github.com/lavanet/lava-sdk/blob/main/supportedChains.json)
  
  Lava SDK supports only rpc calls with positional parameters
  {"jsonrpc": "2.0", "method": "block", "params": ["23"], "id": 1}
  But not rpc calls with named parameters
  {"jsonrpc": "2.0", "method": "subtract", "params": {"subtrahend": 23, "minuend": 42}, "id": 3}
*/
function runJsonRPCExample() {
    return __awaiter(this, void 0, void 0, function* () {
        const privKey = "<private key from Ethereum staked account>";
        const chainID = "ETH1"; // chainID for Ethereum Mainnet
        // Create dAccess for Ethereum Mainnet
        // Default rpcInterface for Ethereum Mainnet is jsonRPC
        const ethereum = yield new sdk_1.default({
            privateKey: privKey,
            chainID: chainID,
        });
        // Get latest block number
        const blockNumberResponse = yield ethereum.sendRelay({
            method: "eth_blockNumber",
            params: [],
        });
        // Parse and extract response
        const parsedResponse = JSON.parse(blockNumberResponse);
        // Extract latest block number
        const latestBlockNumber = parsedResponse.result;
        // Get latest block
        const latestBlock = yield ethereum.sendRelay({
            method: "eth_getBlockByNumber",
            params: [latestBlockNumber, true],
        });
        // Print latest block
        console.log(latestBlock);
    });
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield runJsonRPCExample();
            console.log("Exiting program");
            process.exit(0);
        }
        catch (e) {
            console.log("ERROR", e);
        }
    });
})();
