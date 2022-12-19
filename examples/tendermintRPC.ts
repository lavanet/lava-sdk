// TODO when we publish package we will import latest stable version and not using relative path
import LavaSDK from "../src/sdk/sdk";

/*
  In this example you will see how to use LavaSDK for sending tendermintRPC calls to the Cosmos Hub.
  Because the tendermintRPC is the default rpc interface for Cosmos Hub, we don't need to set it 
  explicitly when initializing LavaSDK decentralize access

  You can find a list with all supported chains (https://github.com/lavanet/lava-sdk/blob/main/supportedChains.json)
  
  Lava SDK supports only rpc calls with positional parameters
  {"jsonrpc": "2.0", "method": "block", "params": ["23"], "id": 1}
  But not rpc calls with named parameters
  {"jsonrpc": "2.0", "method": "subtract", "params": {"subtrahend": 23, "minuend": 42}, "id": 3}
*/
async function runTendermintRPCExample() {
  const privKey = "<private key from Cosmos Hub staked account>";
  const chainID = "COS5"; // chainID for Cosmos Hub

  // Create dAccess for Cosmos Hub
  // Default rpcInterface for Cosmos Hub is tendermintRPC
  const cosmosHub = await new LavaSDK({
    privateKey: privKey,
    chainID: chainID,
  });

  // Get abci_info
  const info = await cosmosHub.sendRelay({
    method: "abci_info",
    params: [],
  });

  // Parse and extract response
  const parsedInfo = JSON.parse(info).result.response;

  // Extract latest block number
  const latestBlockNumber = parsedInfo.last_block_height;

  // Print latest block
  console.log("Latest block: ", latestBlockNumber);

  // Fetch latest block
  const latestblock = await cosmosHub.sendRelay({
    method: "block",
    params: [latestBlockNumber],
  });

  // Print latest block
  console.log(latestblock);
}

(async function () {
  try {
    await runTendermintRPCExample();
    console.log("Exiting program");
    process.exit(0);
  } catch (e) {
    console.log("ERROR", e);
  }
})();
