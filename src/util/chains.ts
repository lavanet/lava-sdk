import supportedChains from "../../supportedChains.json";

export function isValidChainID(chainID: string): boolean {
  const wantedData = supportedChains.filter((item) => item.chainID === chainID);

  if (wantedData.length !== 0) {
    return true;
  }

  return false;
}

export function fetchRpcInterface(chainID: string): string {
  const wantedData = supportedChains.filter((item) => item.chainID === chainID);

  if (wantedData.length !== 1) {
    return "";
  }

  return wantedData[0].defaultRPC;
}
