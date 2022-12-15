import Logger from "../logger/logger";

// Fetch from lava-sdk package
import LavaSDK from "../sdk/sdk";

async function run() {
  const privKey =
    "5c1b89b5196a0b961851f72352a087006283c73410ad890676270fa088f86af2";
  const endpoint = "localhost:26657";
  const chainID = "LAV1";
  const rpcInterface = "tendermintrpc";


  // Create lavaSDK
  const lavaSDK = await new LavaSDK({
    privateKey: privKey,
    chainID: chainID,
    lavaEndpoint: endpoint, // Optional
    rpcInterface: rpcInterface, // Optional
  });

  // Send relay
  const statusResponse = await lavaSDK.sendRelay({
    method: "status",
    params: [],
  });

  console.log(statusResponse)
    /*
  const blockResponse = await lavaSDK.sendRelay({
    method: "block",
    params: ["5"],
  });

  // Print relay
  console.log("statusResponse", statusResponse);
  console.log("blockResponse", blockResponse);

  setTimeout(async () => {
    console.log("Same epoch");
    const statusResponse = await lavaSDK.sendRelay({
      method: "status",
      params: [],
    });

    console.log("statusResponse", statusResponse);
    return;
  }, 5000);

  setTimeout(async () => {
    console.log("New epoch");
    const statusResponse = await lavaSDK.sendRelay({
      method: "status",
      params: [],
    });

    console.log("statusResponse", statusResponse);
    return;
  }, 20000);
  */
}

run()
  .then()
  .catch((err) => {
    Logger.error(err);
  });
