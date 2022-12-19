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
  In this example you will see how to use LavaSDK for sending tendermintRPC calls to the Cosmos Hub.
  Because the tendermintRPC is the default rpc interface for Cosmos Hub, we don't need to set it
  explicitly when initializing LavaSDK decentralize access

  You can find a list with all supported chains (https://github.com/lavanet/lava-sdk/blob/main/supportedChains.json)
  
  Lava SDK supports only rpc calls with positional parameters
  {"jsonrpc": "2.0", "method": "block", "params": ["23"], "id": 1}
  But not rpc calls with named parameters
  {"jsonrpc": "2.0", "method": "subtract", "params": {"subtrahend": 23, "minuend": 42}, "id": 3}
*/
function runTendermintRPCExample() {
    return __awaiter(this, void 0, void 0, function* () {
        const privKey = "<private key from Cosmos Hub staked account>";
        const chainID = "COS5"; // chainID for Cosmos Hub
        // Create dAccess for Cosmos Hub
        // Default rpcInterface for Cosmos Hub is tendermintRPC
        const cosmosHub = yield new sdk_1.default({
            privateKey: privKey,
            chainID: chainID,
        });
        // Get abci_info
        const info = yield cosmosHub.sendRelay({
            method: "abci_info",
            params: [],
        });
        // Parse and extract response
        const parsedInfo = JSON.parse(info).result.response;
        // Extract latest block number
        const latestBlockNumber = parsedInfo.last_block_height;
        // Print latest block
        console.log("Latest block: ", latestBlockNumber);
        // Fetch latest block
        const latestblock = yield cosmosHub.sendRelay({
            method: "block",
            params: [latestBlockNumber],
        });
        // Print latest block
        console.log(latestblock);
    });
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield runTendermintRPCExample();
            console.log("Exiting program");
            process.exit(0);
        }
        catch (e) {
            console.log("ERROR", e);
        }
    });
})();
