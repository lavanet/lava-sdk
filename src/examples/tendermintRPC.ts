import Logger from "../logger/logger";

// Fetch from lava-sdk package
import LavaSDK from "../sdk/sdk";

async function run() {
  const privKey =
    "36781325107ad46f9f432aa47a8c29030a7a4103fa063a8821cc75debdcf2bfe";
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
}

run()
  .then()
  .catch((err) => {
    Logger.error(err);
  });
