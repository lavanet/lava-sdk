/* 
                    Basic example
        This file shows basic usage of the future polygon-sdk library
        Currently we have implemented:
        1. Recreating account from private key
        2. Fetching paring list
*/
import Logger from "../logger/logger";

// Fetch from package
import LavaSDk from "../sdk/sdk";

async function run() {
  const privKey =
    "84a3a0b14484df39907303a7c575937de123b7b2d90d789f57121d273f1a23fd";
  const endpoint = "localhost:26657";
  const chainID = "LAV1";
  const rpcInterface = "rest";

  // Create lavaSDK
  const lavaSDK = new LavaSDk(endpoint, chainID, rpcInterface, privKey);

  // Initialize lavaSDK
  await lavaSDK.init();

  // Send relay
  const response = await lavaSDK.sendRelay();

  // Print relay
  var dec = new TextDecoder();
  console.log("Response", dec.decode(response.getData_asU8()));
}

run()
  .then()
  .catch((err) => {
    Logger.error(err);
  });
