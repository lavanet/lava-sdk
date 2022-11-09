import LavaWallet from './wallet'
import ClientErrors from "./errors"

describe("Fetching account from mnemonic", ()=>{
    it("Successfully fetch account", async ()=> {
        const mnemonic = "client marine special phone fury cry little bar loop soap kiwi kick donate pattern curious spatial grab attend board tuna add famous head crystal"
        const expectedAddress = "lava@194hjlf7swpm9c0rmktswt55p6xhhj6huzxnhaj"
        // Create lava wallet instance
        const lavaWallet = new LavaWallet(mnemonic);

        // Initialize lava wallet
        await lavaWallet.init();

        // Expect no error
        expect(async() => {await lavaWallet.getConsumerAccount()}).not.toThrow(Error)

        // Fetch account
        const accountData = await lavaWallet.getConsumerAccount()

        // Check if account address match expected address
        expect(accountData.address).toBe(expectedAddress)
    })

    it("Fail to fetch account", async ()=> {
        const mnemonic = "client marine special phone fury cry little bar loop soap kiwi kick donate pattern curious spatial grab attend board tuna add famous head crystal"

        // Create lava wallet instance
        const lavaWallet = new LavaWallet(mnemonic);

        // Wallet was never initialized, expect error
        try {
            await lavaWallet.getConsumerAccount()
        }catch (err:any){
            expect(err.message).toBe(ClientErrors.errWalletNotInitialized.message)
        }
    })
    it("Invalid mnemonic, can not create wallet", async ()=> {
        const mnemonic = ""

        // Create lava wallet instance
        const lavaWallet = new LavaWallet(mnemonic);

        // Wallet was never initialized, expect error
        try {
            await lavaWallet.init()
        }catch (err:any){
            expect(err.message).toBe(ClientErrors.errInvalidMnemonic.message)
        }
    })
    

})