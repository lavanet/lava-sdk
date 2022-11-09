import LavaWallet from '../wallet/wallet'
import Logger from '../logger/logger';
class LavaSDK{
    private endpoint:string;
    private chainID:string;
    private rpcInterface:string;
    private lavaWallet: LavaWallet
    
    
    constructor(
        endpoint:string, 
        chainID:string, 
        mnemonic:string, 
        rpcInterface:string
    ){
        this.endpoint=endpoint;
        this.chainID=chainID;
        this.rpcInterface=rpcInterface;

        // Create lava wallet instance
        this.lavaWallet = new LavaWallet(mnemonic)
    }

    async init(){
        // Initialize Lava wallet
        await this.lavaWallet.init();

        // Fetch account
        const account = await this.lavaWallet.getConsumerAccount()

        // Print Account
        Logger.success("Account successfully added")
        this.lavaWallet.printAccount(account);

    }
}

export default LavaSDK