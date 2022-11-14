import LavaWallet from '../wallet/wallet'
import Logger from '../logger/logger';
import LavaConsumer from '../consumer/consumer'

class LavaSDK{
    private lavaWallet: LavaWallet
    private lavaConsumer: LavaConsumer
    
    constructor(
        endpoint:string, 
        chainID:string, 
        privKey:string, 
        rpcInterface:string
    ){
        // Create lava wallet instance
        this.lavaWallet = new LavaWallet(privKey)

        // Create lava consumer instance
        this.lavaConsumer = new LavaConsumer(endpoint, chainID, rpcInterface)
    }

    async init(){
        // Initialize Lava wallet
        await this.lavaWallet.init();

        // Fetch account
        const account = await this.lavaWallet.getConsumerAccount()

        // Print Account
        Logger.success("Account successfully added")
        this.lavaWallet.printAccount(account);

        // Initialize lava consumer
        await this.lavaConsumer.init(account)

        // Get paring
        const paring = await this.lavaConsumer.getPairing()

        // Log paring list
        this.lavaConsumer.printParingList(paring)

        // Pick provider
        this.lavaConsumer.pickRandomProvider(paring)
    }
}

export default LavaSDK