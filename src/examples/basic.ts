/* 
                    Basic example
        This file shows basic usage of the future polygon-sdk library
        Currently we have implemented:
        1. Recreating account from private key
        2. Fetching paring list
*/
import Logger from "../logger/logger";

// Fetch from package
import { createLavaSDK } from "../sdk/sdk";

async function run() {
  const privKey =
    "1a0023826ce81e7fb66c1e6cb7d9e61329a47b72480ebcfd5e902b5e7c6c3090";
  const endpoint = "localhost:26657";
  const chainID = "LAV1";
  const rpcInterface = "tendermintrpc";

  // Create lavaSDK
  const lavaSDK = await createLavaSDK(endpoint, chainID, rpcInterface, privKey);

  // Send relay
  const statusResponse = await lavaSDK.sendRelay("status", []);
  const blockResponse = await lavaSDK.sendRelay("block", ["5"]);

  // Print relay
  const dec = new TextDecoder();
  console.log("StatusResponse: ", dec.decode(statusResponse.getData_asU8()));
  console.log("BlockResponse: ", dec.decode(blockResponse.getData_asU8()));
}

run()
  .then()
  .catch((err) => {
    Logger.error(err);
  });
