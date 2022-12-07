import { NodeHttpTransport } from "@improbable-eng/grpc-web-node-http-transport";
import { grpc } from "@improbable-eng/grpc-web";

let transport: grpc.TransportFactory;

if (typeof window === "undefined") {
  transport = NodeHttpTransport();
} else {
  transport = grpc.CrossBrowserHttpTransport({ withCredentials: false });
}

export default transport;
