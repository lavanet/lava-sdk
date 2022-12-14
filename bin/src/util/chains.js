"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRpcInterface = exports.isValidChainID = void 0;
const supportedChains_json_1 = __importDefault(require("../../supportedChains.json"));
function isValidChainID(chainID) {
    const wantedData = supportedChains_json_1.default.filter((item) => item.chainID === chainID);
    if (wantedData.length !== 0) {
        return true;
    }
    return false;
}
exports.isValidChainID = isValidChainID;
function fetchRpcInterface(chainID) {
    const wantedData = supportedChains_json_1.default.filter((item) => item.chainID === chainID);
    if (wantedData.length !== 1) {
        return "";
    }
    return wantedData[0].defaultRPC;
}
exports.fetchRpcInterface = fetchRpcInterface;
