/* 
                    Basic example
        This file shows basic usage of the future polygon-sdk library
        Currently we have implemented:
        1. Recreating account from private key
        2. Fetching paring list
*/
import Logger from '../logger/logger'

// Fetch from package
import LavaWallet from "../wallet/wallet"
import ConsumerSessionManager from "../consumerSessionManager/consumerSessionManager"
import {RelayerClient} from "../proto/proto/RelayServiceClientPb";
import {RelayRequest} from "../proto/proto/relay_pb"
import {Secp256k1, sha256} from "@cosmjs/crypto"
import { fromHex} from "@cosmjs/encoding";


async function run() {
    const privKey = "84a3a0b14484df39907303a7c575937de123b7b2d90d789f57121d273f1a23fd"
    const endpoint = "localhost:26657"
    const chainID = "LAV1"
    const rpcInterface = "rest"

    // Create wallet
    const wallet = new LavaWallet(privKey);

    // Initialize wallet
    await wallet.init();

    // get account from wallet
    const account = await wallet.getConsumerAccount();

    // print account detail
    wallet.printAccount(account);

    // Create consumer 
    // call it lavaSDK
    const sessionManager = new ConsumerSessionManager(endpoint, chainID, rpcInterface);


    // Initialize consumer 
    await sessionManager.init(account);

    // Fetch consumer session
    const consumerSession = await sessionManager.getConsumerSession()

    // Create relay client
    const client = new RelayerClient('http://localhost:8081', null, null)

    // Create request
    const request = new RelayRequest
    request.setChainid(chainID)
    request.setConnectionType("GET")
    request.setApiUrl("/blocks/latest")
    request.setSessionId(consumerSession.SessionId)
    request.setCuSum(10)
    request.setSig(new Uint8Array())
    request.setData(new Uint8Array())
    request.setProvider(consumerSession.Endpoint.Addr)
    request.setBlockHeight(consumerSession.PairingEpoch)
    request.setRelayNum(consumerSession.RelayNum+1)
    request.setRequestBlock(0)
    request.setUnresponsiveProviders(new Uint8Array())

    // Sign data
    var enc = new TextEncoder();
    var jsonMessage = JSON.stringify(request.toObject(),(key, value) => {
        if (value !== null && value!== 0 && value !== "") return value
    })
    const messageReplaced = jsonMessage.replace(/"([^"]+)":/g, '$1:').slice(1, -1).replace(/,/g," ")
    const encodedMessage = enc.encode(messageReplaced+" ")
    const hash = sha256(encodedMessage);

    const signedMessage = await SignRelay(hash,privKey)

    // Add signature in the request
    request.setSig(signedMessage)

    console.log("Request sent")

    const relayResponse = await client.relay(request, null)
    
    var dec = new TextDecoder();
    console.log("Response", dec.decode(relayResponse.getData_asU8()))
}

async function SignRelay(message:Uint8Array, privKey:string): Promise<Uint8Array>{
    const sig = await Secp256k1.createSignature(message, fromHex(privKey))

    const recovery = sig.recovery
    const r = sig.r();
    const s = sig.s();
    
    // TODO consider adding compression in the signing
    // construct signature
    // <(byte of 27+public key solution)>< padded bytes for signature R><padded bytes for signature S>
    return Uint8Array.from([27+recovery,...r,...s])
}




run()
    .then()
    .catch((err) => {
        Logger.error(err);
    });