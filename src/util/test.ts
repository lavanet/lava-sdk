import supportedChains from "../../supportedChains.json";
import { isValidChainID, fetchRpcInterface, isNetworkValid } from "./chains";

describe("Make sure supportedChains.json is valid", () => {
  it("All entities are valid", async () => {
    supportedChains.filter((item) => {
      // Each entry needs to have 3 attributes (name, chainID, defaultRPC)
      expect(item.name).toBeDefined();
      expect(item.chainID).toBeDefined();
      expect(item.defaultRPC).toBeDefined();

      // No attribute can be empty
      expect(item.name).not.toBe("");
      expect(item.chainID).not.toBe("");
      expect(item.defaultRPC).not.toBe("");

      // For default jsonRPC only these values are supported [jsonrpc,tendermintrpc,rest]
      expect(
        ["jsonrpc", "tendermintrpc", "rest"].includes(item.defaultRPC)
      ).toBe(true);
    });
  });

  it("No duplicates for same chainID", async () => {
    // Create map with all chainIDs
    const chainIDs = supportedChains.map((obj) => obj.chainID);

    // Create array of unique chainIDs
    const uniquechainIDs = Array.from(new Set(chainIDs));

    // SupportedChain.json and uniquechainIDs needs to be equal
    expect(uniquechainIDs.length).toBe(supportedChains.length);
  });
});

describe("Test isValidChainID method", () => {
  it("Entity with specified chainID exists", async () => {
    supportedChains.filter((item) => {
      // For each chainID expect true
      expect(isValidChainID(item.chainID)).toBe(true);
    });
  });
  it("Entity with specified chainID doesn't exist", async () => {
    expect(isValidChainID("InvalidChainID")).toBe(false);
  });
});

describe("Test isNetworkValid", () => {
  it("Network is valid", async () => {
    expect(isNetworkValid("testnet")).toBe(true);
    expect(isNetworkValid("mainnet")).toBe(true);
  });
  it("Network is not valid", async () => {
    expect(isNetworkValid("randomNetwork")).toBe(false);
  });
});

describe("Test fetchRpcInterface method", () => {
  it("Return correct rpc interface for all entities", async () => {
    supportedChains.filter((item) => {
      expect(fetchRpcInterface(item.chainID)).toBe(item.defaultRPC);
    });
  });
  it("If chainID does not exists, should return empty string", async () => {
    expect(fetchRpcInterface("InvalidChainID")).toBe("");
  });
});
