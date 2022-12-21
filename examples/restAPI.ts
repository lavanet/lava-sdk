// TODO when we publish package we will import latest stable version and not using relative path
import { LavaSDK } from "../src/sdk/sdk";

/*
  Demonstrates how to use LavaSDK to send rest API calls to the Juno Mainnet.

  You can find a list with all supported chains (https://github.com/lavanet/lava-sdk/blob/main/supportedChains.json)
*/
async function getLatestBlockAndValidators(): Promise<[string, string]> {
  // Create dAccess for Juno Mainnet
  // Default rpcInterface for Juno Mainnet is tendermintRPC
  // If you want to use rest it needs to be explicitly defined
  const lavaSDK = await new LavaSDK({
    privateKey: "private key from Juno Mainnet staked client",
    chainID: "JUN1", // chainID for Juno Mainnet
    rpcInterface: "rest",
  });

  // Get latest block
  const latestBlock = await lavaSDK.sendRelay({
    method: "GET",
    url: "/blocks/latest",
  });

  // Get latest validator-set
  const validators = await lavaSDK.sendRelay({
    method: "GET",
    url: "/validatorsets/latest",
    data: {
      "pagination.count_total": true,
      "pagination.reverse": "true",
    },
  });

  return [latestBlock, validators];
}

(async function () {
  try {
    const [latestBlock, validators] = await getLatestBlockAndValidators();
    console.log("Latest block:", latestBlock);
    console.log("Latest validators:", validators);
    process.exit(0);
  } catch (error) {
    console.error("Error getting latest block:", error);
  }
})();
