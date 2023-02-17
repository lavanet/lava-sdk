"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRpcInterface = exports.isValidChainID = exports.isNetworkValid = void 0;
const supportedChains_json_1 = __importDefault(require("../../supportedChains.json"));
// isNetworkValid validates network param
function isNetworkValid(network) {
    const validNetworks = ["mainnet", "testnet"];
    return validNetworks.includes(network);
}
exports.isNetworkValid = isNetworkValid;
// isValidChainID validates chainID param
function isValidChainID(chainID) {
    const wantedData = supportedChains_json_1.default.filter((item) => item.chainID === chainID);
    if (wantedData.length !== 0) {
        return true;
    }
    return false;
}
exports.isValidChainID = isValidChainID;
// fetchRpcInterface fetches default rpcInterface for chainID
function fetchRpcInterface(chainID) {
    const wantedData = supportedChains_json_1.default.filter((item) => item.chainID === chainID);
    if (wantedData.length !== 1) {
        return "";
    }
    return wantedData[0].defaultRPC;
}
exports.fetchRpcInterface = fetchRpcInterface;
