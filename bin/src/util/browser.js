"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_web_node_http_transport_1 = require("@improbable-eng/grpc-web-node-http-transport");
const grpc_web_1 = require("@improbable-eng/grpc-web");
let transport;
if (typeof window === "undefined") {
    transport = (0, grpc_web_node_http_transport_1.NodeHttpTransport)();
}
else {
    transport = grpc_web_1.grpc.CrossBrowserHttpTransport({ withCredentials: false });
}
exports.default = transport;
