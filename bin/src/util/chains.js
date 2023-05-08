"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRpcInterface = exports.isValidChainID = exports.isNetworkValid = void 0;
const default_1 = require("../config/default");
// isNetworkValid validates network param
function isNetworkValid(network) {
    return default_1.DEFAULT_NETWORKS.includes(network);
}
exports.isNetworkValid = isNetworkValid;
// isValidChainID validates chainID param
function isValidChainID(chainID, supportedChains) {
    return !!supportedChains.chainInfoList.find((chainInfo) => chainInfo.chainID === chainID);
}
exports.isValidChainID = isValidChainID;
// fetchRpcInterface fetches default rpcInterface for chainID
function fetchRpcInterface(chainID, supportedChains) {
    const targetChainInfo = supportedChains.chainInfoList.find((chainInfo) => chainInfo.chainID === chainID);
    if (!targetChainInfo) {
        throw new Error(`ChainID ${chainID} not found.`);
    }
    const preferredOrder = ["tendermintrpc", "jsonrpc", "rest"];
    for (const apiInterface of preferredOrder) {
        if (targetChainInfo.enabledApiInterfaces.includes(apiInterface)) {
            return apiInterface;
        }
    }
    throw new Error(`None of the preferred API interfaces were found for ChainID ${chainID}.`);
}
exports.fetchRpcInterface = fetchRpcInterface;
