"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const relay_pb_service_1 = require("../pairing/relay_pb_service");
const relay_pb_1 = require("../pairing/relay_pb");
const grpc_web_1 = require("@improbable-eng/grpc-web");
const browser_1 = __importDefault(require("../util/browser"));
const serverAddress = "http://localhost:8080";
// Function to send the gRPC request
function sendRequest() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("entered sendRequest!");
        // Create a new instance of the BadgeGeneratorClient
        const client = new relay_pb_service_1.RelayerClient(serverAddress);
        console.log("client: ", client);
        // Create a new GenerateBadgeRequest
        const request = new relay_pb_1.GenerateBadgeRequest();
        request.setBadgeAddress("lava@1xxacpczgrnleajam6jkkaptufpfd4dcaaps0r6");
        request.setProjectId("aabbcc");
        console.log("request: ", request);
        console.log("request.setUserId: ", request.getBadgeAddress());
        console.log("request.setProjectKey: ", request.getProjectId());
        const requestPromise = new Promise((resolve, reject) => {
            grpc_web_1.grpc.invoke(relay_pb_service_1.Relayer.GenerateBadge, {
                request: request,
                host: serverAddress,
                transport: browser_1.default,
                onMessage: (message) => {
                    resolve(message);
                },
                onEnd: (code, msg) => {
                    if (code == grpc_web_1.grpc.Code.OK || msg == undefined) {
                        return;
                    }
                    reject(new Error(msg));
                },
            });
        });
        console.log("reqProm: ", requestPromise);
        return relayWithTimeout(2000, requestPromise);
    });
}
function relayWithTimeout(timeLimit, task) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("ENTERED HERE!");
        let timeout;
        const timeoutPromise = new Promise((resolve, reject) => {
            timeout = setTimeout(() => {
                reject(new Error("Timeout exceeded"));
            }, timeLimit);
        });
        const response = yield Promise.race([task, timeoutPromise]);
        if (timeout) {
            //the code works without this but let's be safe and clean up the timeout
            clearTimeout(timeout);
        }
        return response;
    });
}
// Call the function to send the request
sendRequest()
    .then((response) => {
    processResponse(response);
})
    .catch((error) => {
    console.error("Error custom:", error);
});
// Function to process the response
function processResponse(response) {
    console.log("Response:", response.toObject());
}
