import Logger from "../logger/logger";

// Fetch from lava-sdk package
import LavaSDK from "../sdk/sdk";

async function run() {
  const privKey =
    "415bc94455508c90468b8121a388f327d81c6b4875277470ef72438499c7f2dd";
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
  const latestBlock = await lavaSDK.sendRestRelay({
    method: "GET",
    url: "/blocks/latest",
    data: {},
  });

  console.log("latest block", latestBlock);

  const data = await lavaSDK.sendRestRelay({
    method: "GET",
    url: "/cosmos/bank/v1beta1/denoms_metadata",
    data: {
      "pagination.count_total": "true",
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
