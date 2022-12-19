import { AccountData } from "@cosmjs/proto-signing";
import { Secp256k1Wallet } from "@cosmjs/amino";
import WalletErrors from "./errors";
import Logger from "../logger/logger";
import { fromHex } from "@cosmjs/encoding";

// prefix for lava accounts
const lavaPrefix = "lava@";

class LavaWallet {
  private wallet: Secp256k1Wallet | Error;
  private privKey: string;

  constructor(privKey: string) {
    this.privKey = privKey;
    this.wallet = WalletErrors.errWalletNotInitialized;
  }

  // Initialize client
  async init() {
    try {
      this.wallet = await Secp256k1Wallet.fromKey(
        fromHex(this.privKey),
        lavaPrefix
      );
    } catch (err) {
      throw WalletErrors.errInvalidPrivateKey;
    }
  }

  // Get consumer account from the wallet
  async getConsumerAccount(): Promise<AccountData> {
    try {
      // Check if wallet was initialized
      if (this.wallet instanceof Error) {
        throw WalletErrors.errWalletNotInitialized;
      }

      // Fetch account
      const account = await this.wallet.getAccounts();

      // Check if zero account exists
      if (account[0] == undefined) {
        throw WalletErrors.errZeroAccountDoesNotExists;
      }

      // Return zero account from wallet
      return account[0];
    } catch (err) {
      throw err;
    }
  }

  // Print account details
  printAccount(AccountData: AccountData) {
    Logger.info("INFO:");
    Logger.info("Address: " + AccountData.address);
    Logger.info("Public key: " + AccountData.pubkey);
    Logger.emptyLine();
  }
}

export async function createWallet(privKey: string): Promise<LavaWallet> {
  // Create lavaSDK
  const wallet = new LavaWallet(privKey);

  // Initialize wallet
  await wallet.init();

  return wallet;
}
