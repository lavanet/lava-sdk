import { DirectSecp256k1HdWallet, AccountData} from "@cosmjs/proto-signing";
import ClientErrors from "./errors"
import Logger from "../logger/logger";

const lavaPrefix = "lava@"
class LavaClient{
    private wallet: DirectSecp256k1HdWallet| Error;
    private mnemonic:string;

    constructor(mnemonic:string){
        this.mnemonic = mnemonic;
        this.wallet = ClientErrors.errWalletNotInitialized;
    }

    // Initialize client
    async init(){
        this.wallet = await DirectSecp256k1HdWallet.fromMnemonic(this.mnemonic,{ prefix: lavaPrefix });
    }

    // Get consumer account from the wallet
    async getConsumerAccount(): Promise<AccountData | Error> {
        // check if wallet was initialized
        if (this.wallet instanceof Error) {return this.wallet};

        // Return zero account from wallet
        var accountZero = (await this.wallet.getAccounts())[0];
        
        return accountZero;
    }

    // Print account details
    printAccount(AccountData: AccountData) {
        Logger.info("INFO:")
        Logger.info("Address" + AccountData.address)
        Logger.info("Public key" + AccountData.pubkey)
        Logger.emptyLine()
    }
}

export default LavaClient