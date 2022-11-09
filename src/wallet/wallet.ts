import { DirectSecp256k1HdWallet, AccountData} from "@cosmjs/proto-signing";
import WalletErrors from "./errors"
import Logger from "../logger/logger";

// prefix for lava accounts
const lavaPrefix = "lava@"

class LavaWallet{
    private wallet: DirectSecp256k1HdWallet| Error;
    private mnemonic:string;

    constructor(mnemonic:string){
        this.mnemonic = mnemonic;
        this.wallet = WalletErrors.errWalletNotInitialized;
    }

    // Initialize client
    async init(){
        try{
            this.wallet = await DirectSecp256k1HdWallet.fromMnemonic(this.mnemonic,{ prefix: lavaPrefix });
        }catch(err){
            throw WalletErrors.errInvalidMnemonic
        } 
    }

    // Get consumer account from the wallet
    async getConsumerAccount(): Promise<AccountData> {
        // check if wallet was initialized
        if (this.wallet instanceof Error) {
            throw new Error(this.wallet.message)
        };

        // Return zero account from wallet
        var accountZero = (await this.wallet.getAccounts())[0];
        
        return accountZero;
    }

    // Print account details
    printAccount(AccountData: AccountData) {
        Logger.info("INFO:")
        Logger.info("Address: " + AccountData.address)
        Logger.info("Public key: " + AccountData.pubkey)
        Logger.emptyLine()
    }
}

export default LavaWallet