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
/*
                    Basic example
        This file shows basic usage of the future polygon-sdk library
        Currently we have implemented:
        1. Recreating account from private key
        2. Fetching paring list
*/
const logger_1 = __importDefault(require("../logger/logger"));
// Fetch from package
const sdk_1 = require("../sdk/sdk");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const privKey = "b12aafc9bc603c5c01e4fa9d6f5bd2dcf43e25c44da0502ce8b629bc467c0f82";
        const endpoint = "localhost:26657";
        const chainID = "LAV1";
        const rpcInterface = "tendermintrpc";
        // Create lavaSDK
        const lavaSDK = yield (0, sdk_1.createLavaSDK)(endpoint, chainID, rpcInterface, privKey);
        // Send relay
        const statusResponse = yield lavaSDK.sendRelay("status", []);
        const blockResponse = yield lavaSDK.sendRelay("block", ["5"]);
        // Print relay
        const dec = new TextDecoder();
        console.log("StatusResponse: ", dec.decode(statusResponse.getData_asU8()));
        console.log("BlockResponse: ", dec.decode(blockResponse.getData_asU8()));
    });
}
run()
    .then()
    .catch((err) => {
    logger_1.default.error(err);
});
