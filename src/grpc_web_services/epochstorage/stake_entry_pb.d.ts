// package: lavanet.lava.epochstorage
// file: epochstorage/stake_entry.proto

import * as jspb from "google-protobuf";
import * as epochstorage_endpoint_pb from "../epochstorage/endpoint_pb";
import * as gogoproto_gogo_pb from "../gogoproto/gogo_pb";
import * as cosmos_base_v1beta1_coin_pb from "../cosmos/base/v1beta1/coin_pb";

export class StakeEntry extends jspb.Message {
  hasStake(): boolean;
  clearStake(): void;
  getStake(): cosmos_base_v1beta1_coin_pb.Coin | undefined;
  setStake(value?: cosmos_base_v1beta1_coin_pb.Coin): void;

  getAddress(): string;
  setAddress(value: string): void;

  getStakeAppliedBlock(): number;
  setStakeAppliedBlock(value: number): void;

  clearEndpointsList(): void;
  getEndpointsList(): Array<epochstorage_endpoint_pb.Endpoint>;
  setEndpointsList(value: Array<epochstorage_endpoint_pb.Endpoint>): void;
  addEndpoints(value?: epochstorage_endpoint_pb.Endpoint, index?: number): epochstorage_endpoint_pb.Endpoint;

  getGeolocation(): number;
  setGeolocation(value: number): void;

  getChain(): string;
  setChain(value: string): void;

  getMoniker(): string;
  setMoniker(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StakeEntry.AsObject;
  static toObject(includeInstance: boolean, msg: StakeEntry): StakeEntry.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StakeEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StakeEntry;
  static deserializeBinaryFromReader(message: StakeEntry, reader: jspb.BinaryReader): StakeEntry;
}

export namespace StakeEntry {
  export type AsObject = {
    stake?: cosmos_base_v1beta1_coin_pb.Coin.AsObject,
    address: string,
    stakeAppliedBlock: number,
    endpointsList: Array<epochstorage_endpoint_pb.Endpoint.AsObject>,
    geolocation: number,
    chain: string,
    moniker: string,
  }
}

