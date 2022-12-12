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
    "5d98d25f0230eb3e8bcf2fdf356b5ed63dbf4cdecead19d5d79b0792682ff6ae";
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

  setTimeout(async () => {
    console.log("Same epoch");
    const statusResponse = await lavaSDK.sendRelay("status", []);

    const dec = new TextDecoder();
    console.log("StatusResponse", dec.decode(statusResponse.getData_asU8()));
  }, 5000);

  setTimeout(async () => {
    console.log("New epoch");
    const statusResponse = await lavaSDK.sendRelay("status", []);

    const dec = new TextDecoder();
    console.log("StatusResponse", dec.decode(statusResponse.getData_asU8()));
  }, 20000);
}

run()
  .then()
  .catch((err) => {
    Logger.error(err);
  });
