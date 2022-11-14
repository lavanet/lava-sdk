import LavaWallet from './wallet'
import ClientErrors from "./errors"

describe("Fetching account from private key", ()=>{
    it("Successfully fetch account", async ()=> {
        const privateKey = "885c3ebe355979d68d16f51e267040eb91e39021db07a9608ad881782d546009"
        const expectedAddress = "lava@194hjlf7swpm9c0rmktswt55p6xhhj6huzxnhaj"
        // Create lava wallet instance
        const lavaWallet = new LavaWallet(privateKey);

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
        const privateKey = "client marine special phone fury cry little bar loop soap kiwi kick donate pattern curious spatial grab attend board tuna add famous head crystal"

        // Create lava wallet instance
        const lavaWallet = new LavaWallet(privateKey);

        // Wallet was never initialized, expect error
        try {
            await lavaWallet.getConsumerAccount()
        }catch (err:any){
            expect(err.message).toBe(ClientErrors.errWalletNotInitialized.message)
        }
    })
    it("Invalid private key, can not create wallet", async ()=> {
        const privayeKey = ""

        // Create lava wallet instance
        const lavaWallet = new LavaWallet(privayeKey);

        // Wallet was never initialized, expect error
        try {
            await lavaWallet.init()
        }catch (err:any){
            expect(err.message).toBe(ClientErrors.errInvalidPrivateKey.message)
        }
    })
    

})