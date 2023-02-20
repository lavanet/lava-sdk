import supportedChains from "../../supportedChains.json";
import { DEFAULT_NETWORKS } from "../config/default";

// isNetworkValid validates network param
export function isNetworkValid(network: string): boolean {
  return DEFAULT_NETWORKS.includes(network);
}

// isValidChainID validates chainID param
export function isValidChainID(chainID: string): boolean {
  const wantedData = supportedChains.filter((item) => item.chainID === chainID);

  if (wantedData.length !== 0) {
    return true;
  }

  return false;
}

// fetchRpcInterface fetches default rpcInterface for chainID
export function fetchRpcInterface(chainID: string): string {
  const wantedData = supportedChains.filter((item) => item.chainID === chainID);

  if (wantedData.length !== 1) {
    return "";
  }

  return wantedData[0].defaultRPC;
}
