import LavaClient from '../client/client'
import Logger from '../logger/logger';
class LavaSDK{
    private endpoint:string;
    private chainID:string;
    private rpcInterface:string;
    private lavaCLient: LavaClient
    
    
    constructor(
        endpoint:string, 
        chainID:string, 
        mnemonic:string, 
        rpcInterface:string
    ){
        this.endpoint=endpoint;
        this.chainID=chainID;
        this.rpcInterface=rpcInterface;

        // TODO naming lavaClient sounds more as client not as user?
        this.lavaCLient = new LavaClient(mnemonic)
    }

    async init(){
        // Initialize Lava client
        await this.lavaCLient.init();

        // Fetch account
        const account = await this.lavaCLient.getConsumerAccount()
        if (account instanceof Error) {
            Logger.error(account.message)
            return
        };

        // Print Account
        Logger.success("Account successfully added")
        this.lavaCLient.printAccount(account);

    }
}

export default LavaSDK