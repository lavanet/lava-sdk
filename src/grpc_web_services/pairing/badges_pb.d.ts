// package: lavanet.lava.pairing
// file: pairing/badges.proto

import * as jspb from "google-protobuf";
import * as pairing_relay_pb from "../pairing/relay_pb";
import * as gogoproto_gogo_pb from "../gogoproto/gogo_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";
import * as epochstorage_stake_entry_pb from "../epochstorage/stake_entry_pb";

export class GenerateBadgeRequest extends jspb.Message {
  getBadgeAddress(): string;
  setBadgeAddress(value: string): void;

  getProjectId(): string;
  setProjectId(value: string): void;

  getSpecId(): string;
  setSpecId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenerateBadgeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GenerateBadgeRequest): GenerateBadgeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GenerateBadgeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenerateBadgeRequest;
  static deserializeBinaryFromReader(message: GenerateBadgeRequest, reader: jspb.BinaryReader): GenerateBadgeRequest;
}

export namespace GenerateBadgeRequest {
  export type AsObject = {
    badgeAddress: string,
    projectId: string,
    specId: string,
  }
}

export class GenerateBadgeResponse extends jspb.Message {
  hasBadge(): boolean;
  clearBadge(): void;
  getBadge(): pairing_relay_pb.Badge | undefined;
  setBadge(value?: pairing_relay_pb.Badge): void;

  clearPairingListList(): void;
  getPairingListList(): Array<epochstorage_stake_entry_pb.StakeEntry>;
  setPairingListList(value: Array<epochstorage_stake_entry_pb.StakeEntry>): void;
  addPairingList(value?: epochstorage_stake_entry_pb.StakeEntry, index?: number): epochstorage_stake_entry_pb.StakeEntry;

  getBadgeSignerAddress(): string;
  setBadgeSignerAddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenerateBadgeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GenerateBadgeResponse): GenerateBadgeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GenerateBadgeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenerateBadgeResponse;
  static deserializeBinaryFromReader(message: GenerateBadgeResponse, reader: jspb.BinaryReader): GenerateBadgeResponse;
}

export namespace GenerateBadgeResponse {
  export type AsObject = {
    badge?: pairing_relay_pb.Badge.AsObject,
    pairingListList: Array<epochstorage_stake_entry_pb.StakeEntry.AsObject>,
    badgeSignerAddress: string,
  }
}

