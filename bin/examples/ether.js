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
// TODO when we publish package we will import latest stable version and not using relative path
const ether_1 = require("../src/providers/ether");
function getLatestBlock() {
    return __awaiter(this, void 0, void 0, function* () {
        // Initializing Lava Ether.js provider
        const ethProvider = yield new ether_1.LavaEtherProvider({
            chainID: "ETH1",
            privKey: "6cedd036b1eb0ffe9d5f92d111b0d026ae15d10b905af1bf8bcdc2b024311a73",
        });
        // Fetch latest block from Ethereum Mainnet
        // Using etherProvider.getBlockNumber()
        const latestBlock = yield ethProvider.getBlockNumber();
        // Return latest block
        return latestBlock;
    });
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const latestBlock = yield getLatestBlock();
            console.log("Latest block:", latestBlock);
            process.exit(0);
        }
        catch (error) {
            console.error("Error getting latest block:", error);
        }
    });
})();
