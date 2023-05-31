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
exports.fetchBadge = void 0;
// import { RelayerClient, Relayer } from "../pairing/relay_pb_service.js";
// import { GenerateBadgeRequest, GenerateBadgeResponse } from "../pairing/relay_pb.js";
const badge_pb_service_1 = require("./badge_pb_service");
const badge_pb_1 = require("./badge_pb");
const grpc_web_1 = require("@improbable-eng/grpc-web");
const browser_1 = __importDefault(require("../util/browser"));
// const serverAddress = "http://localhost:8080";
// Function to send the gRPC request
function fetchBadge(serverAddress, badgeUser, projectKey) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a new GenerateBadgeRequest
        const request = new badge_pb_1.GenerateBadgeRequest();
        request.setBadgeAddress(badgeUser);
        request.setProjectId(projectKey);
        // request.setChainId("LAV1");
        const requestPromise = new Promise((resolve, reject) => {
            grpc_web_1.grpc.invoke(badge_pb_service_1.BadgeGenerator.GenerateBadge, {
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
        return relayWithTimeout(10000, requestPromise);
    });
}
exports.fetchBadge = fetchBadge;
function relayWithTimeout(timeLimit, task) {
    return __awaiter(this, void 0, void 0, function* () {
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
// // Call the function to send the request
// fetchBadge("http://localhost:8080", "user1", "projectId" )
//     .then((response) => {
//         processResponse(response);
//     })
//     .catch((error) => {
//         console.error("Error custom:", error);
//     });
// // Function to process the response
// function processResponse(response: GenerateBadgeResponse) {
//     console.log("Response:", response.toObject());
// }
