import {
  EnglishMnemonic,
  Slip10,
  Slip10Curve,
  stringToPath,
  Bip39,
} from "@cosmjs/crypto";
import { toHex } from "@cosmjs/encoding";

export const isEnglishMnemonic = (mnemmonic: string) => {
  try {
    new EnglishMnemonic(mnemmonic);
    return true;
  } catch {
    return false;
  }
};

export const createPrivKeyFromMnemonic = async (
  mnemmonic: string,
  hdPath = "m/44'/118'/0'/0/0"
) => {
  const mnemonicChecked = new EnglishMnemonic(mnemmonic);
  const seed = await Bip39.mnemonicToSeed(mnemonicChecked);
  const path = stringToPath(hdPath);
  return toHex(Slip10.derivePath(Slip10Curve.Secp256k1, seed, path).privkey);
};
