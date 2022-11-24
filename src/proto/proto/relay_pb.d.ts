import * as jspb from 'google-protobuf'



export class RelayRequest extends jspb.Message {
  getChainid(): string;
  setChainid(value: string): RelayRequest;

  getConnectionType(): string;
  setConnectionType(value: string): RelayRequest;

  getApiUrl(): string;
  setApiUrl(value: string): RelayRequest;

  getSessionId(): number;
  setSessionId(value: number): RelayRequest;

  getCuSum(): number;
  setCuSum(value: number): RelayRequest;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): RelayRequest;

  getSig(): Uint8Array | string;
  getSig_asU8(): Uint8Array;
  getSig_asB64(): string;
  setSig(value: Uint8Array | string): RelayRequest;

  getProvider(): string;
  setProvider(value: string): RelayRequest;

  getBlockHeight(): number;
  setBlockHeight(value: number): RelayRequest;

  getRelayNum(): number;
  setRelayNum(value: number): RelayRequest;

  getRequestBlock(): number;
  setRequestBlock(value: number): RelayRequest;

  getDatareliability(): VRFData | undefined;
  setDatareliability(value?: VRFData): RelayRequest;
  hasDatareliability(): boolean;
  clearDatareliability(): RelayRequest;

  getUnresponsiveProviders(): Uint8Array | string;
  getUnresponsiveProviders_asU8(): Uint8Array;
  getUnresponsiveProviders_asB64(): string;
  setUnresponsiveProviders(value: Uint8Array | string): RelayRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RelayRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RelayRequest): RelayRequest.AsObject;
  static serializeBinaryToWriter(message: RelayRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RelayRequest;
  static deserializeBinaryFromReader(message: RelayRequest, reader: jspb.BinaryReader): RelayRequest;
}

export namespace RelayRequest {
  export type AsObject = {
    chainid: string,
    connectionType: string,
    apiUrl: string,
    sessionId: number,
    cuSum: number,
    data: Uint8Array | string,
    sig: Uint8Array | string,
    provider: string,
    blockHeight: number,
    relayNum: number,
    requestBlock: number,
    datareliability?: VRFData.AsObject,
    unresponsiveProviders: Uint8Array | string,
  }
}

export class RelayReply extends jspb.Message {
  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): RelayReply;

  getSig(): Uint8Array | string;
  getSig_asU8(): Uint8Array;
  getSig_asB64(): string;
  setSig(value: Uint8Array | string): RelayReply;

  getNonce(): number;
  setNonce(value: number): RelayReply;

  getLatestBlock(): number;
  setLatestBlock(value: number): RelayReply;

  getFinalizedBlocksHashes(): Uint8Array | string;
  getFinalizedBlocksHashes_asU8(): Uint8Array;
  getFinalizedBlocksHashes_asB64(): string;
  setFinalizedBlocksHashes(value: Uint8Array | string): RelayReply;

  getSigBlocks(): Uint8Array | string;
  getSigBlocks_asU8(): Uint8Array;
  getSigBlocks_asB64(): string;
  setSigBlocks(value: Uint8Array | string): RelayReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RelayReply.AsObject;
  static toObject(includeInstance: boolean, msg: RelayReply): RelayReply.AsObject;
  static serializeBinaryToWriter(message: RelayReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RelayReply;
  static deserializeBinaryFromReader(message: RelayReply, reader: jspb.BinaryReader): RelayReply;
}

export namespace RelayReply {
  export type AsObject = {
    data: Uint8Array | string,
    sig: Uint8Array | string,
    nonce: number,
    latestBlock: number,
    finalizedBlocksHashes: Uint8Array | string,
    sigBlocks: Uint8Array | string,
  }
}

export class VRFData extends jspb.Message {
  getDifferentiator(): boolean;
  setDifferentiator(value: boolean): VRFData;

  getVrfValue(): Uint8Array | string;
  getVrfValue_asU8(): Uint8Array;
  getVrfValue_asB64(): string;
  setVrfValue(value: Uint8Array | string): VRFData;

  getVrfProof(): Uint8Array | string;
  getVrfProof_asU8(): Uint8Array;
  getVrfProof_asB64(): string;
  setVrfProof(value: Uint8Array | string): VRFData;

  getProviderSig(): Uint8Array | string;
  getProviderSig_asU8(): Uint8Array;
  getProviderSig_asB64(): string;
  setProviderSig(value: Uint8Array | string): VRFData;

  getAlldatahash(): Uint8Array | string;
  getAlldatahash_asU8(): Uint8Array;
  getAlldatahash_asB64(): string;
  setAlldatahash(value: Uint8Array | string): VRFData;

  getQueryhash(): Uint8Array | string;
  getQueryhash_asU8(): Uint8Array;
  getQueryhash_asB64(): string;
  setQueryhash(value: Uint8Array | string): VRFData;

  getSig(): Uint8Array | string;
  getSig_asU8(): Uint8Array;
  getSig_asB64(): string;
  setSig(value: Uint8Array | string): VRFData;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VRFData.AsObject;
  static toObject(includeInstance: boolean, msg: VRFData): VRFData.AsObject;
  static serializeBinaryToWriter(message: VRFData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VRFData;
  static deserializeBinaryFromReader(message: VRFData, reader: jspb.BinaryReader): VRFData;
}

export namespace VRFData {
  export type AsObject = {
    differentiator: boolean,
    vrfValue: Uint8Array | string,
    vrfProof: Uint8Array | string,
    providerSig: Uint8Array | string,
    alldatahash: Uint8Array | string,
    queryhash: Uint8Array | string,
    sig: Uint8Array | string,
  }
}

