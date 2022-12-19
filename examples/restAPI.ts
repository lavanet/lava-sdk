// TODO when we publish package we will import latest stable version and not using relative path
import LavaSDK from "../src/sdk/sdk";

/*
  In this example you will see how to use LavaSDK for sending rest API calls to the Juno Mainnet.
  Because the rest is not the default rpc interface for Juno Mainnet, we need to set it 
  explicitly when initializing LavaSDK decentralize access

  You can find a list with all supported chains (https://github.com/lavanet/lava-sdk/blob/main/supportedChains.json)
*/
async function runRestApiExample() {
  const privKey =
    "09af45c8f60b96f7142136d3b08213d98e8288ebca20ca11cb002633c5bd805d";
  const chainID = "JUN1"; // chainID for Juno Mainnet

  // Create dAccess for Juno Mainnet
  // Default rpcInterface for Juno Mainnet is tendermintRPC
  // If you want to use rest it needs to be explicitly defined
  const lavaSDK = await new LavaSDK({
    privateKey: privKey,
    chainID: chainID,
    rpcInterface: "rest",
  });

  // Get latest block
  const latestBlock = await lavaSDK.sendRelay({
    method: "GET",
    url: "/blocks/latest",
  });

  // Print latest block
  console.log(latestBlock);

  // Get latest validator-set
  const validators = await lavaSDK.sendRelay({
    method: "GET",
    url: "/validatorsets/latest",
    data: {
      "pagination.count_total": true,
      "pagination.reverse": "true",
    },
  });

  // Print latest validator-set
  console.log(validators);
}

(async function () {
  try {
    await runRestApiExample();
    console.log("Exiting program");
    process.exit(0);
  } catch (e) {
    console.log("ERROR", e);
  }
})();
