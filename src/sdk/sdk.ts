import {createWallet} from "../wallet/wallet";
import SDKErrors from "./errors";
import { AccountData } from "@cosmjs/proto-signing";
import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import {
  QueryClientImpl,
  QueryGetPairingRequest,
  QueryGetPairingResponse,
  QueryUserEntryRequest,
} from "../codec/pairing/query";
import {
  QueryClientImpl as EpochQueryService,
  QueryParamsRequest,
} from "../codec/epochstorage/query";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {
  ConsumerSessionWithProvider,
  Endpoint,
  SingleConsumerSession,
} from "../types/types";
import Long from "long";
import { Secp256k1, sha256 } from "@cosmjs/crypto";
import { fromHex } from "@cosmjs/encoding";
import { RelayerClient } from "../proto/proto/RelayServiceClientPb";
import { RelayRequest, RelayReply } from "../proto/proto/relay_pb";

class LavaSDK {
  private chainID: string;
  private endpoint: string;
  private privKey: string;
  private rpcInterface: string;
  private account: AccountData | Error;

  private queryService: QueryClientImpl | Error;
  private epochQueryService: EpochQueryService | Error;
  private tendermintClient: Tendermint34Client | Error;

  private activeConsumerSession: ConsumerSessionWithProvider | Error;

  constructor(
    endpoint: string,
    chainID: string,
    rpcInterface: string,
    privKey: string
  ) {
    this.endpoint = endpoint;
    this.chainID = chainID;
    this.rpcInterface = rpcInterface;
    this.privKey = privKey;
    this.account = SDKErrors.errAccountNotInitialized;
    this.queryService = SDKErrors.errQueryServiceNotInitialized;
    this.epochQueryService = SDKErrors.errEpochQueryServiceNotInitialized;
    this.tendermintClient = SDKErrors.errTendermintClientServiceNotInitialized;
    this.activeConsumerSession =
      SDKErrors.errActiveConsumerSessionNotInitialized;
  }

  // Initialize consumer
  async init() {
    // Create wallet
    const wallet = await createWallet(this.privKey);

    // Get account from wallet
    this.account = await wallet.getConsumerAccount();

    // print account detail
    wallet.printAccount(this.account);

    // Initialize query service

    // TODO Tendermint34Client.connect returns ExperimentalWarning
    const tmClient = await Tendermint34Client.connect(this.endpoint);
    const queryClient = new QueryClient(tmClient);
    const rpcClient = createProtobufRpcClient(queryClient);
    this.queryService = new QueryClientImpl(rpcClient);
    this.epochQueryService = new EpochQueryService(rpcClient);
    this.tendermintClient = tmClient;
  }

  async sendRelay(): Promise<RelayReply> {
    // Fetch consumer session
    const consumerSession = await this.getConsumerSession();

    // Create relay client
    const client = new RelayerClient("http://localhost:8081", null, null);

    // Create request
    const request = new RelayRequest();
    request.setChainid(this.chainID);
    request.setConnectionType("GET");
    request.setApiUrl("/blocks/latest");
    request.setSessionId(consumerSession.SessionId);
    request.setCuSum(10);
    request.setSig(new Uint8Array());
    request.setData(new Uint8Array());
    request.setProvider(consumerSession.Endpoint.Addr);
    request.setBlockHeight(consumerSession.PairingEpoch);
    request.setRelayNum(consumerSession.RelayNum + 1);
    request.setRequestBlock(0);
    request.setUnresponsiveProviders(new Uint8Array());

    // Sign data
    var enc = new TextEncoder();
    var jsonMessage = JSON.stringify(request.toObject(), (key, value) => {
      if (value !== null && value !== 0 && value !== "") return value;
    });
    const messageReplaced = jsonMessage
      .replace(/"([^"]+)":/g, "$1:")
      .slice(1, -1)
      .replace(/,/g, " ");
    const encodedMessage = enc.encode(messageReplaced + " ");
    const hash = sha256(encodedMessage);

    const signedMessage = await this.SignRelay(hash, this.privKey);

    // Add signature in the request
    request.setSig(signedMessage);

    console.log("Request sent");

    const relayResponse = await client.relay(request, null);

    return relayResponse;
  }

  async SignRelay(message: Uint8Array, privKey: string): Promise<Uint8Array> {
    const sig = await Secp256k1.createSignature(message, fromHex(privKey));

    const recovery = sig.recovery;
    const r = sig.r();
    const s = sig.s();

    // TODO consider adding compression in the signing
    // construct signature
    // <(byte of 27+public key solution)>< padded bytes for signature R><padded bytes for signature S>
    return Uint8Array.from([27 + recovery, ...r, ...s]);
  }

  async getConsumerSession(): Promise<SingleConsumerSession> {
    // Check if active session exists
    if (this.activeConsumerSession instanceof Error) {
      // Fetch pairing
      const pairing = await this.getPairing();

      // Pick provider
      const consumerSession = this.pickRandomProvider(pairing);

      // Set active session
      this.activeConsumerSession = consumerSession;
    }

    // Return active consumer session
    return this.activeConsumerSession.Session;
  }

  // Get pairing list for specified wallet in current epoch
  async getPairing(): Promise<Array<ConsumerSessionWithProvider>> {
    try {
      // Check if account was initialized
      if (this.account instanceof Error) {
        throw SDKErrors.errAccountNotInitialized;
      }

      if (this.tendermintClient instanceof Error) {
        throw SDKErrors.errTendermintClientServiceNotInitialized;
      }

      // Create pairing request for getPairing method
      const pairingRequest = {
        chainID: this.chainID,
        client: this.account.address,
      };

      // Get pairing from the chain
      const pairingResponse = await this.getPairingFromChain(pairingRequest);

      // Extract providers from pairing response
      const providers = pairingResponse.providers;

      // Initialize ConsumerSessionWithProvider array
      const pairing: Array<ConsumerSessionWithProvider> = [];

      // Fetch latest block
      const blockResponse = await this.tendermintClient.block();

      // Fetch latest block number
      const latestBlockNumber = blockResponse.block.header.height;

      // fetch epoch size
      const epochNumber = await this.getEpochNumber(latestBlockNumber);

      // create request for getting userEntity
      const userEntityRequest = {
        address: this.account.address,
        chainID: this.chainID,
        block: new Long(latestBlockNumber),
      };

      // fetch max compute units
      const maxcu = await this.getMaxCuForUser(userEntityRequest);

      //Iterate over providers to populate pairing list
      for (let provider of providers) {
        // Skip providers with no endpoints
        if (provider.endpoints.length == 0) {
          continue;
        }

        // Initialize relevantEndpoints array
        let relevantEndpoints: Array<Endpoint> = [];

        //only take into account endpoints that use the same api interface
        for (let endpoint of provider.endpoints) {
          if (endpoint.useType == this.rpcInterface) {
            const convertedEndpoint = new Endpoint(endpoint.iPPORT, true, 0);
            relevantEndpoints.push(convertedEndpoint);
          }
        }

        // Skip providers with no relevant endpoints
        if (relevantEndpoints.length == 0) {
          continue;
        }

        // Create a new pairing object

        // TODO when initializing relevantEndpoints it needs to check if valid
        const newPairing = new ConsumerSessionWithProvider(
          this.account.address,
          relevantEndpoints,
          new SingleConsumerSession(
            0,
            0,
            0,
            relevantEndpoints[0],
            (epochNumber - 1) * 20
          ),
          maxcu,
          0,
          false,
          epochNumber
        );

        // Add newly created pairing in the pairing list
        pairing.push(newPairing);
      }

      return pairing;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  pickRandomProvider(
    providers: Array<ConsumerSessionWithProvider>
  ): ConsumerSessionWithProvider {
    // Remove providers which does not match criteria
    let validProviders = providers.filter((item) => item.MaxComputeUnits > 0);

    // TODO check with Ran how to know if provider is blocked?

    // Pick random provider
    const random = Math.floor(Math.random() * validProviders.length);

    return validProviders[random];
  }

  private async getPairingFromChain(
    request: QueryGetPairingRequest
  ): Promise<QueryGetPairingResponse> {
    // Check if query service was initialized
    if (this.queryService instanceof Error) {
      throw SDKErrors.errQueryServiceNotInitialized;
    }

    // Get pairing from the chain
    const queryResult = await this.queryService.GetPairing(request);

    return queryResult;
  }

  private async getMaxCuForUser(
    request: QueryUserEntryRequest
  ): Promise<number> {
    // Check if query service was initialized
    if (this.queryService instanceof Error) {
      throw SDKErrors.errQueryServiceNotInitialized;
    }

    // Get pairing from the chain
    const queryResult = await this.queryService.UserEntry(request);

    // return maxCu from userEntry
    return queryResult.maxCU.low;
  }

  private async getEpochNumber(latestBlockNumber: number) {
    // Check if query service was initialized
    if (this.epochQueryService instanceof Error) {
      throw SDKErrors.errEpochQueryServiceNotInitialized;
    }

    // Create params request
    const epochRequst: QueryParamsRequest = {};

    // Get epoch params from the chain
    const queryResult = await this.epochQueryService.Params(epochRequst);

    // Extract epoch size from params
    const epochSize = queryResult.params?.epochBlocks.low;
    if (epochSize == undefined) {
      throw new Error("Epoch size undefined");
    }

    // Calculate epoch number
    const epochNumber = Math.trunc(latestBlockNumber / epochSize) + 1;

    return epochNumber;
  }
}

export async function createLavaSDK(
  endpoint: string,
  chainID: string,
  rpcInterface: string,
  privKey: string
): Promise<LavaSDK> {
  // Create lavaSDK
  const lavaSDK = new LavaSDK(endpoint, chainID, rpcInterface, privKey);

  // Initialize lavaSDK
  await lavaSDK.init();

  return lavaSDK;
}
