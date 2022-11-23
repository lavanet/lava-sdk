import {AccountData} from "@cosmjs/proto-signing";
import { createProtobufRpcClient, QueryClient} from "@cosmjs/stargate";
import {QueryClientImpl,QueryGetPairingRequest, QueryGetPairingResponse, QueryUserEntryRequest} from "../codec/pairing/query";
import {QueryClientImpl as EpochQueryService, QueryParamsRequest} from "../codec/epochstorage/query"

import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {ConsumerSessionWithProvider, Endpoint, SingleConsumerSession} from "./types"
import ConsumerErrors from './errors'
import Logger from '../logger/logger'
import Long from 'long'


class consumerSessionManager {
    private chainID:string 
    private endpoint:string
    private rpcInterface:string
    private account: AccountData | Error

    private queryService: QueryClientImpl | Error;
    private epochQueryService: EpochQueryService | Error
    private tendermintClient: Tendermint34Client | Error

    private activeConsumerSession: ConsumerSessionWithProvider | Error

    constructor(endpoint:string, chainID:string, rpcInterface:string){
        this.endpoint= endpoint
        this.chainID=chainID
        this.rpcInterface=rpcInterface
        this.account= ConsumerErrors.errAccountNotInitialized
        this.queryService = ConsumerErrors.errQueryServiceNotInitialized
        this.epochQueryService = ConsumerErrors.errEpochQueryServiceNotInitialized
        this.tendermintClient = ConsumerErrors.errTendermintClientServiceNotInitialized
        this.activeConsumerSession = ConsumerErrors.errActiveConsumerSessionNotInitialized
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
        this.epochQueryService = new EpochQueryService(rpcClient)
        this.tendermintClient = tmClient
    }

    async getConsumerSession(): Promise<SingleConsumerSession>{
        // Check if active session exists
        if (this.activeConsumerSession instanceof Error){
            // Fetch pairing
            const pairing = await this.getPairing()

            // Pick provider
            const consumerSession = this.pickRandomProvider(pairing)

            // Set active session
            this.activeConsumerSession = consumerSession
        }

        // Return active consumer session
        return this.activeConsumerSession.Session
    }

    // Get pairing list for specified wallet in current epoch
    async getPairing(): Promise<Array<ConsumerSessionWithProvider>> {
        // Check if account was initialized
        if(this.account instanceof Error){
            throw ConsumerErrors.errAccountNotInitialized
        }

        if(this.tendermintClient instanceof Error){
            throw ConsumerErrors.errTendermintClientServiceNotInitialized
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

        // Fetch latest block
        const blockResponse = await this.tendermintClient.block()

        // Fetch latest block number
        const latestBlockNumber = blockResponse.block.header.height

        // fetch epoch size
        const epochNumber = await this.getEpochNumber(latestBlockNumber)

        // create request for getting userEntity
        const userEntityRequest = {
            address:this.account.address,
            chainID:this.chainID,
            block: new Long(latestBlockNumber)
        }

        // fetch max compute units
        const maxcu = await this.getMaxCuForUser(userEntityRequest)

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

            // Create a new pairing object

            // TODO when initializing relevantEndpoints it needs to check if valid
            const newPairing = new ConsumerSessionWithProvider(
                this.account.address,
                relevantEndpoints,
                new SingleConsumerSession(
                    0,
                    0,
                    this.getNewSessionId(),
                    0,
                    relevantEndpoints[0],
                    (epochNumber-1)*20
                ),
                maxcu,
                0,
                false,
                epochNumber
            )
            
            // Add newly created pairing in the pairing list
            pairing.push(newPairing);
        }

        return pairing
    }

    pickRandomProvider(providers:Array<ConsumerSessionWithProvider>):
    ConsumerSessionWithProvider{
        // Remove providers which does not match criteria
        let validProviders = providers.filter(item => item.MaxComputeUnits>0)

        // TODO check with Ran how to know if provider is blocked?

        // Pick random provider
        const random = Math.floor(Math.random() * validProviders.length);

        return validProviders[random]
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

    private async getMaxCuForUser(request : QueryUserEntryRequest): Promise<number>{
        // Check if query service was initialized
        if(this.queryService instanceof Error){
            throw ConsumerErrors.errQueryServiceNotInitialized
        }

        // Get pairing from the chain
        const queryResult = await this.queryService.UserEntry(request);

        // return maxCu from userEntry
        return queryResult.maxCU.low;
    }

    private async getEpochNumber(latestBlockNumber : number){
        // Check if query service was initialized
        if(this.epochQueryService instanceof Error){
            throw ConsumerErrors.errEpochQueryServiceNotInitialized
        }

        // Create params request
        const epochRequst:QueryParamsRequest = {}

        // Get epoch params from the chain
        const queryResult = await this.epochQueryService.Params(epochRequst)

        // Extract epoch size from params
        const epochSize = queryResult.params?.epochBlocks.low
        if (epochSize == undefined){
            throw new Error("Epoch size undefined")
        }

        // Calculate epoch number
        const epochNumber = Math.trunc(latestBlockNumber / epochSize) + 1

        return epochNumber
    }

    private getNewSessionId(): number {
        // TODO for production need better session generator
        const min = 100000
        const max = 1000000000000
        return Math.floor( Math.random() * (max - min) + min);
    }

    printParingList(pairing:Array<ConsumerSessionWithProvider>) {
        Logger.emptyLine();
        Logger.success("Paring list successfully fetched")
        Logger.deepInfo(pairing)
        Logger.emptyLine();
    }
}

export default consumerSessionManager