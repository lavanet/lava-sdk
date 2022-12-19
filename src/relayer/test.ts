import { RelayRequest } from "../proto/relay_pb";
import Relayer from "./relayer";

it("Test relayRequest signature", () => {
  const testCasses: {
    request: RelayRequest;
    hash: Uint8Array;
    signature: Uint8Array;
  }[] = [
    {
      request: getRPCRelayRequest(),
      hash: new Uint8Array([
        172, 88, 26, 227, 47, 250, 118, 34, 148, 79, 104, 107, 111, 50, 201,
        249, 210, 35, 251, 220, 91, 191, 117, 166, 3, 141, 154, 69, 92, 229,
        205, 91,
      ]),
      signature: new Uint8Array([
        28, 194, 59, 192, 51, 126, 207, 142, 140, 121, 16, 201, 179, 108, 250,
        150, 198, 203, 8, 26, 118, 181, 166, 239, 73, 80, 62, 153, 98, 123, 229,
        248, 163, 90, 249, 145, 113, 84, 89, 184, 111, 226, 102, 112, 218, 73,
        129, 246, 233, 13, 6, 2, 227, 39, 179, 182, 53, 192, 145, 43, 146, 85,
        124, 46, 30,
      ]),
    },
    {
      request: getRestRelayRequest(),
      hash: new Uint8Array([
        155, 196, 71, 240, 81, 149, 215, 1, 51, 208, 13, 85, 86, 62, 84, 7, 47,
        92, 14, 11, 10, 244, 144, 179, 103, 162, 229, 214, 90, 111, 139, 33,
      ]),
      signature: new Uint8Array([
        27, 110, 235, 125, 122, 78, 204, 111, 112, 149, 112, 157, 167, 113, 75,
        109, 41, 248, 120, 14, 206, 64, 66, 81, 4, 194, 243, 179, 150, 113, 87,
        39, 172, 29, 161, 139, 149, 109, 181, 159, 19, 219, 11, 97, 245, 178,
        252, 151, 165, 15, 175, 142, 253, 16, 50, 210, 19, 123, 131, 42, 189,
        72, 216, 81, 66,
      ]),
    },
  ];
  const privKeyExample =
    "733de2413ffd2487b0fc37d01455de213dcc0907e1c2e7c82a84db6dc4b5b02e";
  const relayer = new Relayer("", privKeyExample);

  testCasses.map(async (test) => {
    // Check if the relay request was prepared successfully
    expect(relayer.prepareRequest(test.request)).toEqual(test.hash);
    // Sign relay
    const signature = await relayer.signRelay(test.request, privKeyExample);
    // Check if the signature was generated successfully
    expect(signature).toEqual(test.signature);
  });
});

function getRPCRelayRequest(): RelayRequest {
  // Create request
  const tendermintRpcRequest = new RelayRequest();
  tendermintRpcRequest.setChainid("LAV1");
  tendermintRpcRequest.setConnectionType("");
  tendermintRpcRequest.setApiUrl("");
  tendermintRpcRequest.setSessionId(100);
  tendermintRpcRequest.setCuSum(10);
  tendermintRpcRequest.setSig(new Uint8Array());
  tendermintRpcRequest.setData(
    '{"jsonrpc": "2.0", "id": 1, "method": "status", "params": []}'
  );
  tendermintRpcRequest.setProvider(
    "lava@1sdpzcv4lg72efqk3lnstn089vqvjeda6757da2"
  );
  tendermintRpcRequest.setBlockHeight(60);
  tendermintRpcRequest.setRelayNum(1);
  tendermintRpcRequest.setRequestBlock(-1);
  tendermintRpcRequest.setUnresponsiveProviders(new Uint8Array());
  return tendermintRpcRequest;
}

function getRestRelayRequest(): RelayRequest {
  // Create request
  const tendermintRpcRequest = new RelayRequest();
  tendermintRpcRequest.setChainid("LAV1");
  tendermintRpcRequest.setConnectionType("GET");
  tendermintRpcRequest.setApiUrl("/blocks/latest");
  tendermintRpcRequest.setSessionId(100);
  tendermintRpcRequest.setCuSum(10);
  tendermintRpcRequest.setSig(new Uint8Array());
  tendermintRpcRequest.setData("?");
  tendermintRpcRequest.setProvider(
    "lava@1sdpzcv4lg72efqk3lnstn089vqvjeda6757da2"
  );
  tendermintRpcRequest.setBlockHeight(780);
  tendermintRpcRequest.setRelayNum(1);
  tendermintRpcRequest.setUnresponsiveProviders(new Uint8Array());

  return tendermintRpcRequest;
}
