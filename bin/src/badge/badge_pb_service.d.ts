// package: 
// file: badge.proto

import * as badge_pb from "./badge_pb";
import {grpc} from "@improbable-eng/grpc-web";

type BadgeGeneratorGenerateBadge = {
  readonly methodName: string;
  readonly service: typeof BadgeGenerator;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof badge_pb.GenerateBadgeRequest;
  readonly responseType: typeof badge_pb.GenerateBadgeResponse;
};

export class BadgeGenerator {
  static readonly serviceName: string;
  static readonly GenerateBadge: BadgeGeneratorGenerateBadge;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class BadgeGeneratorClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  generateBadge(
    requestMessage: badge_pb.GenerateBadgeRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: badge_pb.GenerateBadgeResponse|null) => void
  ): UnaryResponse;
  generateBadge(
    requestMessage: badge_pb.GenerateBadgeRequest,
    callback: (error: ServiceError|null, responseMessage: badge_pb.GenerateBadgeResponse|null) => void
  ): UnaryResponse;
}

