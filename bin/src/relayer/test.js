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
const relay_pb_1 = require("../proto/relay_pb");
const relayer_1 = __importDefault(require("./relayer"));
it("Test relayRequest signature", () => {
    const testCasses = [
        {
            request: getRPCRelayRequest(),
            hash: new Uint8Array([
                86, 219, 65, 157, 138, 115, 2, 235, 17, 41, 218, 188, 246, 56, 139, 131,
                12, 218, 239, 150, 202, 7, 194, 240, 135, 5, 106, 238, 148, 76, 148,
                161,
            ]),
            signature: new Uint8Array([
                28, 53, 200, 76, 253, 90, 61, 174, 82, 180, 159, 13, 147, 68, 253, 234,
                160, 201, 198, 248, 178, 194, 128, 81, 186, 143, 194, 28, 103, 83, 162,
                4, 229, 83, 54, 16, 219, 88, 10, 32, 58, 196, 173, 114, 163, 141, 62,
                55, 190, 26, 139, 129, 124, 236, 225, 162, 150, 186, 195, 192, 36, 37,
                128, 129, 117,
            ]),
        },
    ];
    const privKeyExample = "9deaba87285fdbfc65024731a319bacf49aa12e9147927ce3dac613395420213";
    const relayer = new relayer_1.default("", privKeyExample);
    testCasses.map((test) => __awaiter(void 0, void 0, void 0, function* () {
        // Sign relay
        const signature = yield relayer.signRelay(test.request, privKeyExample);
        // Check if the relay request was prepared successfully
        expect(relayer.prepareRequest(test.request)).toBe(test.hash);
        // Check if the signature was generated successfully
        //expect(signature).toBe(test.signature)
    }));
});
function getRPCRelayRequest() {
    // Create request
    const tendermintRpcRequest = new relay_pb_1.RelayRequest();
    tendermintRpcRequest.setChainid("LAV1");
    tendermintRpcRequest.setConnectionType("");
    tendermintRpcRequest.setApiUrl("");
    tendermintRpcRequest.setSessionId(100);
    tendermintRpcRequest.setCuSum(10);
    tendermintRpcRequest.setSig(new Uint8Array());
    tendermintRpcRequest.setData('{"jsonrpc": "2.0", "id": 1, "method": "status", "params": []}');
    tendermintRpcRequest.setProvider("lava@177p4z3p2a68ny02tfyms6jgt6pmsefrr25u9w6");
    tendermintRpcRequest.setBlockHeight(20);
    tendermintRpcRequest.setRelayNum(1);
    tendermintRpcRequest.setRequestBlock(-1);
    tendermintRpcRequest.setUnresponsiveProviders(new Uint8Array([]));
    console.log(tendermintRpcRequest.getSessionId());
    return tendermintRpcRequest;
}
