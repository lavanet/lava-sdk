// package: lavanet.lava.pairing
// file: proto/relay.proto

import * as jspb from "google-protobuf";

export class RelaySession extends jspb.Message {
  getSpecid(): string;
  setSpecid(value: string): void;

  getContentHash(): Uint8Array | string;
  getContentHash_asU8(): Uint8Array;
  getContentHash_asB64(): string;
  setContentHash(value: Uint8Array | string): void;

  getSessionId(): number;
  setSessionId(value: number): void;

  getCuSum(): number;
  setCuSum(value: number): void;

  getProvider(): string;
  setProvider(value: string): void;

  getRelayNum(): number;
  setRelayNum(value: number): void;

  getEpoch(): number;
  setEpoch(value: number): void;

  getUnresponsiveProviders(): Uint8Array | string;
  getUnresponsiveProviders_asU8(): Uint8Array;
  getUnresponsiveProviders_asB64(): string;
  setUnresponsiveProviders(value: Uint8Array | string): void;

  getLavaChainId(): string;
  setLavaChainId(value: string): void;

  getSig(): Uint8Array | string;
  getSig_asU8(): Uint8Array;
  getSig_asB64(): string;
  setSig(value: Uint8Array | string): void;

  hasBadge(): boolean;
  clearBadge(): void;
  getBadge(): Badge | undefined;
  setBadge(value?: Badge): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RelaySession.AsObject;
  static toObject(includeInstance: boolean, msg: RelaySession): RelaySession.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RelaySession, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RelaySession;
  static deserializeBinaryFromReader(message: RelaySession, reader: jspb.BinaryReader): RelaySession;
}

export namespace RelaySession {
  export type AsObject = {
    specid: string,
    contentHash: Uint8Array | string,
    sessionId: number,
    cuSum: number,
    provider: string,
    relayNum: number,
    epoch: number,
    unresponsiveProviders: Uint8Array | string,
    lavaChainId: string,
    sig: Uint8Array | string,
    badge?: Badge.AsObject,
  }
}

export class RelayPrivateData extends jspb.Message {
  getConnectionType(): string;
  setConnectionType(value: string): void;

  getApiUrl(): string;
  setApiUrl(value: string): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  getRequestBlock(): number;
  setRequestBlock(value: number): void;

  getApiinterface(): string;
  setApiinterface(value: string): void;

  getSalt(): Uint8Array | string;
  getSalt_asU8(): Uint8Array;
  getSalt_asB64(): string;
  setSalt(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RelayPrivateData.AsObject;
  static toObject(includeInstance: boolean, msg: RelayPrivateData): RelayPrivateData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RelayPrivateData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RelayPrivateData;
  static deserializeBinaryFromReader(message: RelayPrivateData, reader: jspb.BinaryReader): RelayPrivateData;
}

export namespace RelayPrivateData {
  export type AsObject = {
    connectionType: string,
    apiUrl: string,
    data: Uint8Array | string,
    requestBlock: number,
    apiinterface: string,
    salt: Uint8Array | string,
  }
}

export class RelayRequest extends jspb.Message {
  hasRelaySession(): boolean;
  clearRelaySession(): void;
  getRelaySession(): RelaySession | undefined;
  setRelaySession(value?: RelaySession): void;

  hasRelayData(): boolean;
  clearRelayData(): void;
  getRelayData(): RelayPrivateData | undefined;
  setRelayData(value?: RelayPrivateData): void;

  hasDatareliability(): boolean;
  clearDatareliability(): void;
  getDatareliability(): VRFData | undefined;
  setDatareliability(value?: VRFData): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RelayRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RelayRequest): RelayRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RelayRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RelayRequest;
  static deserializeBinaryFromReader(message: RelayRequest, reader: jspb.BinaryReader): RelayRequest;
}

export namespace RelayRequest {
  export type AsObject = {
    relaySession?: RelaySession.AsObject,
    relayData?: RelayPrivateData.AsObject,
    datareliability?: VRFData.AsObject,
  }
}

export class Badge extends jspb.Message {
  getCuAllocation(): number;
  setCuAllocation(value: number): void;

  getEpoch(): number;
  setEpoch(value: number): void;

  getBadgePk(): Uint8Array | string;
  getBadgePk_asU8(): Uint8Array;
  getBadgePk_asB64(): string;
  setBadgePk(value: Uint8Array | string): void;

  getSpecId(): string;
  setSpecId(value: string): void;

  getProjectSig(): Uint8Array | string;
  getProjectSig_asU8(): Uint8Array;
  getProjectSig_asB64(): string;
  setProjectSig(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Badge.AsObject;
  static toObject(includeInstance: boolean, msg: Badge): Badge.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Badge, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Badge;
  static deserializeBinaryFromReader(message: Badge, reader: jspb.BinaryReader): Badge;
}

export namespace Badge {
  export type AsObject = {
    cuAllocation: number,
    epoch: number,
    badgePk: Uint8Array | string,
    specId: string,
    projectSig: Uint8Array | string,
  }
}

export class RelayReply extends jspb.Message {
  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  getSig(): Uint8Array | string;
  getSig_asU8(): Uint8Array;
  getSig_asB64(): string;
  setSig(value: Uint8Array | string): void;

  getNonce(): number;
  setNonce(value: number): void;

  getLatestBlock(): number;
  setLatestBlock(value: number): void;

  getFinalizedBlocksHashes(): Uint8Array | string;
  getFinalizedBlocksHashes_asU8(): Uint8Array;
  getFinalizedBlocksHashes_asB64(): string;
  setFinalizedBlocksHashes(value: Uint8Array | string): void;

  getSigBlocks(): Uint8Array | string;
  getSigBlocks_asU8(): Uint8Array;
  getSigBlocks_asB64(): string;
  setSigBlocks(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RelayReply.AsObject;
  static toObject(includeInstance: boolean, msg: RelayReply): RelayReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
  getChainid(): string;
  setChainid(value: string): void;

  getEpoch(): number;
  setEpoch(value: number): void;

  getDifferentiator(): boolean;
  setDifferentiator(value: boolean): void;

  getVrfValue(): Uint8Array | string;
  getVrfValue_asU8(): Uint8Array;
  getVrfValue_asB64(): string;
  setVrfValue(value: Uint8Array | string): void;

  getVrfProof(): Uint8Array | string;
  getVrfProof_asU8(): Uint8Array;
  getVrfProof_asB64(): string;
  setVrfProof(value: Uint8Array | string): void;

  getProviderSig(): Uint8Array | string;
  getProviderSig_asU8(): Uint8Array;
  getProviderSig_asB64(): string;
  setProviderSig(value: Uint8Array | string): void;

  getAlldatahash(): Uint8Array | string;
  getAlldatahash_asU8(): Uint8Array;
  getAlldatahash_asB64(): string;
  setAlldatahash(value: Uint8Array | string): void;

  getQueryhash(): Uint8Array | string;
  getQueryhash_asU8(): Uint8Array;
  getQueryhash_asB64(): string;
  setQueryhash(value: Uint8Array | string): void;

  getSig(): Uint8Array | string;
  getSig_asU8(): Uint8Array;
  getSig_asB64(): string;
  setSig(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VRFData.AsObject;
  static toObject(includeInstance: boolean, msg: VRFData): VRFData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VRFData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VRFData;
  static deserializeBinaryFromReader(message: VRFData, reader: jspb.BinaryReader): VRFData;
}

export namespace VRFData {
  export type AsObject = {
    chainid: string,
    epoch: number,
    differentiator: boolean,
    vrfValue: Uint8Array | string,
    vrfProof: Uint8Array | string,
    providerSig: Uint8Array | string,
    alldatahash: Uint8Array | string,
    queryhash: Uint8Array | string,
    sig: Uint8Array | string,
  }
}

