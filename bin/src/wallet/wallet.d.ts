import { AccountData } from "@cosmjs/proto-signing";
declare class LavaWallet {
    private wallet;
    private privKey;
    constructor(privKey: string);
    init(): Promise<void>;
    getConsumerAccount(): Promise<AccountData>;
    printAccount(AccountData: AccountData): void;
}
export declare function createWallet(privKey: string): Promise<LavaWallet>;
export {};
