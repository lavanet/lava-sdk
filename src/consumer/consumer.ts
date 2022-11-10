import {AccountData} from "@cosmjs/proto-signing";
import { createProtobufRpcClient, QueryClient} from "@cosmjs/stargate";
import {QueryClientImpl,QueryGetPairingRequest, QueryGetPairingResponse } from "../codec/pairing/query";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {ConsumerSessionWithProvider, Endpoint} from "./types"
import ConsumerErrors from './errors'
import Logger from '../logger/logger'


class LavaConsumer {
    private chainID:string 
    private endpoint:string
    private rpcInterface:string
    private account: AccountData | Error
    private queryService: QueryClientImpl | Error;

    constructor(endpoint:string, chainID:string, rpcInterface:string){
        this.endpoint= endpoint
        this.chainID=chainID
        this.rpcInterface=rpcInterface
        this.account= ConsumerErrors.errAccountNotInitialized
        this.queryService = ConsumerErrors.errQueryServiceNotInitialized
    }

    // Initialize consumer
    async init(account:AccountData){
        // Initialize account
        this.account = account

        // Initialize query service

        // TODO Tendermint34Client.connect returns ExperimentalWarning
        const tmClient = await Tendermint34Client.connect(this.endpoint);
        const queryClient = new QueryClient(tmClient);
        const rpcClient = createProtobufRpcClient(queryClient);
        this.queryService = new QueryClientImpl(rpcClient);

    }

    // Get pairing list for specified wallet in current epoch
    async getPairing(): Promise<Array<ConsumerSessionWithProvider>> {
        // Check if account was initialized
        if(this.account instanceof Error){
            throw ConsumerErrors.errAccountNotInitialized
        }

        // Create pairing request for getPairing method
        const pairingRequest = {
            chainID: this.chainID,
            client: this.account.address
        }

        // Get pairing from the chain
        const pairingResponse = await this.getPairingFromChain(pairingRequest);

        // Extract providers from pairing response
        const providers = pairingResponse.providers

        // Initialize ConsumerSessionWithProvider array
        const pairing: Array<ConsumerSessionWithProvider> = []

        //Iterate over providers to populate pairing list
        for (let provider of providers) {
            // Skip providers with no endpoints
            if (provider.endpoints.length == 0) {
                continue
            }

            // Initialize relevantEndpoints array
            let relevantEndpoints: Array<Endpoint> = []

            //only take into account endpoints that use the same api interface
            for (let endpoint of provider.endpoints) {
                if (endpoint.useType == this.rpcInterface) {
                    const convertedEndpoint = new Endpoint(endpoint.iPPORT,true,0)
                    relevantEndpoints.push(convertedEndpoint)
                }
            }

            // Skip providers with no relevant endpoints
            if (relevantEndpoints.length == 0) {
                continue
            }

            // TODO fetch max compute units
            

            // TODO fetch current epoch

            // Create a new pairing object
            const newPairing = new ConsumerSessionWithProvider(
                this.account.address,
                relevantEndpoints,
                0,
                0,
                false,
                0
            )
            
            // Add newly created pairing in the pairing list
            pairing.push(newPairing);
        }

        return pairing
    }

    private async getPairingFromChain(request:QueryGetPairingRequest): Promise<QueryGetPairingResponse>{
        // Check if query service was initialized
        if(this.queryService instanceof Error){
            throw ConsumerErrors.errQueryServiceNotInitialized
        }

        // Get pairing from the chain
        const queryResult = await this.queryService.GetPairing(request);

        return queryResult;
    }

    printPairingList(pairing:Array<ConsumerSessionWithProvider>) {
        Logger.emptyLine();
        Logger.success("Pairing list successfully fetched")
        Logger.infoAnyFull(pairing)
        Logger.emptyLine();
    }
}

export default LavaConsumer