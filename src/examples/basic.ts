/* 
                    Basic example
        This file shows basic usage of the future polygon-sdk library
        Currently we have implemented:
        1. Recreating account from mnemonic
        2. Fetching paring list (without epoch and maxcu attribute)
*/
import Logger from '../logger/logger'

// Fetch from package
import LavaWallet from "../wallet/wallet"
import LavaConsumer from "../consumer/consumer"

async function run() {
    const mnemonic = "client marine special phone fury cry little bar loop soap kiwi kick donate pattern curious spatial grab attend board tuna add famous head crystal"
    const endpoint = "http://44.205.140.46:26657"
    const chainID = "ETH1"
    const rpcInterface = "jsonrpc"

    // Create wallet
    const wallet = new LavaWallet(mnemonic);

    // Initialize wallet
    await wallet.init();

    // get account from wallet
    const account = await wallet.getConsumerAccount();

    // print account detail
    wallet.printAccount(account);

    // Create consumer 
    const consumer = new LavaConsumer(endpoint, chainID, rpcInterface);

    // Initialize consumer 
    await consumer.init(account);

    // Get paring list
    const paring = await consumer.getPairing();

    // Print paring
    consumer.printParingList(paring);

    // Pick provider
    consumer.pickRandomProvider(paring)
}



run()
    .then()
    .catch((err) => {
        Logger.error(err);
    });