declare type ChainInfo = {
    chainName: string;
    chainID: string;
    enabledApiInterfaces: string[];
};
declare type ChainInfoList = {
    chainInfoList: ChainInfo[];
};
export declare function isNetworkValid(network: string): boolean;
export declare function isValidChainID(chainID: string, supportedChains: ChainInfoList): boolean;
export declare function fetchRpcInterface(chainID: string, supportedChains: ChainInfoList): string;
export {};
