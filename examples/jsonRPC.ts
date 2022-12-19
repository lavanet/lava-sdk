// TODO when we publish package we will import latest stable version and not using relative path
import LavaSDK from "../src/sdk/sdk";

/*
  In this example you will see how to use LavaSDK for sending jsonRPC calls to the Ethereum Mainnet.
  Because the jsonRPC is the default rpc interface for Ethereum Mainnet, we don't need to set it 
  explicitly when initializing LavaSDK decentralize access

  You can find a list with all supported chains (https://github.com/lavanet/lava-sdk/blob/main/supportedChains.json)
  
  Lava SDK supports only rpc calls with positional parameters
  {"jsonrpc": "2.0", "method": "block", "params": ["23"], "id": 1}
  But not rpc calls with named parameters
  {"jsonrpc": "2.0", "method": "subtract", "params": {"subtrahend": 23, "minuend": 42}, "id": 3}
*/
async function runJsonRPCExample() {
  const privKey = "<private key from Ethereum Mainnet staked client>";
  const chainID = "ETH1"; // chainID for Ethereum Mainnet

  // Create dAccess for Ethereum Mainnet
  // Default rpcInterface for Ethereum Mainnet is jsonRPC
  const ethereum = await new LavaSDK({
    privateKey: privKey,
    chainID: chainID,
  });

  // Get latest block number
  const blockNumberResponse = await ethereum.sendRelay({
    method: "eth_blockNumber",
    params: [],
  });

  // Parse and extract response
  const parsedResponse = JSON.parse(blockNumberResponse);

  // Extract latest block number
  const latestBlockNumber = parsedResponse.result;

  // Get latest block
  const latestBlock = await ethereum.sendRelay({
    method: "eth_getBlockByNumber",
    params: [latestBlockNumber, true],
  });

  // Print latest block
  console.log(latestBlock);
}

(async function () {
  try {
    await runJsonRPCExample();
    console.log("Exiting program");
    process.exit(0);
  } catch (e) {
    console.log("ERROR", e);
  }
})();
