import Logger from "../logger/logger";

// Fetch from lava-sdk package
import LavaSDK from "../sdk/sdk";

async function run() {
  const privKey =
    "da73b083cb54e797184f756306e4252d50f77061c3e777f03ee2c38a1c4568b1";
  const endpoint = "localhost:26657";
  const chainID = "LAV1";
  const rpcInterface = "tendermintrpc";

  // Create lavaSDK
  const lavaSDK = await new LavaSDK({
    privateKey: privKey,
    chainID: chainID,
    endpoint: endpoint, // Optional
    rpcInterface: rpcInterface, // Optional
  });

  // Send relay
  const statusResponse = await lavaSDK.sendRelay("status", []);
  const blockResponse = await lavaSDK.sendRelay("block", ["5"]);

  // Print relay
  console.log("statusResponse", statusResponse);
  console.log("blockResponse", blockResponse);

  setTimeout(async () => {
    console.log("Same epoch");
    const statusResponse = await lavaSDK.sendRelay("status", []);

    console.log("statusResponse", statusResponse);
  }, 5000);

  setTimeout(async () => {
    console.log("New epoch");
    const statusResponse = await lavaSDK.sendRelay("status", []);

    console.log("statusResponse", statusResponse);
  }, 20000);
}

run()
  .then()
  .catch((err) => {
    Logger.error(err);
  });
