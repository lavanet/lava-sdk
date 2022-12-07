// package: lavanet.lava.pairing
// file: proto/relay.proto

var proto_relay_pb = require("./relay_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Relayer = (function () {
  function Relayer() {}
  Relayer.serviceName = "lavanet.lava.pairing.Relayer";
  return Relayer;
}());

Relayer.Relay = {
  methodName: "Relay",
  service: Relayer,
  requestStream: false,
  responseStream: false,
  requestType: proto_relay_pb.RelayRequest,
  responseType: proto_relay_pb.RelayReply
};

exports.Relayer = Relayer;

function RelayerClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

RelayerClient.prototype.relay = function relay(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Relayer.Relay, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.RelayerClient = RelayerClient;

