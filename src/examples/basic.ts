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
    "ccbf8186963cea8b08043878e439426d7a9244fc6f1121d264c4f5d53618ee2d";
  const endpoint = "localhost:26657";
  const chainID = "LAV1";
  const rpcInterface = "rest";

  // Create lavaSDK
  const lavaSDK = await createLavaSDK(endpoint, chainID, rpcInterface, privKey);

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
