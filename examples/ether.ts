// TODO when we publish package we will import latest stable version and not using relative path
import { LavaEtherProvider } from "../src/providers/ether";

async function getLatestBlock(): Promise<number> {
  // Initializing Lava Ether.js provider
  const ethProvider = await new LavaEtherProvider({
    chainID: "ETH1",
    privKey: "<private key>",
  });

  // Fetch latest block from Ethereum Mainnet
  // Using etherProvider.getBlockNumber()
  const latestBlock = await ethProvider.getBlockNumber();

  // Return latest block
  return latestBlock;
}

(async function () {
  try {
    const latestBlock = await getLatestBlock();
    console.log("Latest block:", latestBlock);
    process.exit(0);
  } catch (error) {
    console.error("Error getting latest block:", error);
  }
})();
