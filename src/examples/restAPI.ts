import Logger from "../logger/logger";

// Fetch from lava-sdk package
import LavaSDK from "../sdk/sdk";

async function run() {
  const privKey =
    "9deaba87285fdbfc65024731a319bacf49aa12e9147927ce3dac613395420213";
  const endpoint = "localhost:26657";
  const chainID = "LAV1";
  const rpcInterface = "rest";

  // Create lavaSDK
  const lavaSDK = await new LavaSDK({
    privateKey: privKey,
    chainID: chainID,
    lavaEndpoint: endpoint, // Optional
    rpcInterface: rpcInterface, // Optional
  });

  // Send rest relay
  const latestBlock = await lavaSDK.sendRelay({
    method: "GET",
    url: "/blocks/latest",
  });

  console.log("latest block", latestBlock);

  const data = await lavaSDK.sendRelay({
    method: "GET",
    url: "/cosmos/bank/v1beta1/denoms_metadata",
    data: {
      "pagination.count_total": true,
      "pagination.reverse": "true",
    },
  });

  console.log("data", data);
}

run()
  .then()
  .catch((err) => {
    Logger.error(err);
  });
