"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPrivKeyFromMnemonic = exports.isEnglishMnemonic = void 0;
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
const isEnglishMnemonic = (mnemmonic) => {
    try {
        new crypto_1.EnglishMnemonic(mnemmonic);
        return true;
    }
    catch (_a) {
        return false;
    }
};
exports.isEnglishMnemonic = isEnglishMnemonic;
const createPrivKeyFromMnemonic = (mnemmonic, hdPath = "m/44'/118'/0'/0/0") => __awaiter(void 0, void 0, void 0, function* () {
    const mnemonicChecked = new crypto_1.EnglishMnemonic(mnemmonic);
    const seed = yield crypto_1.Bip39.mnemonicToSeed(mnemonicChecked);
    const path = (0, crypto_1.stringToPath)(hdPath);
    return (0, encoding_1.toHex)(crypto_1.Slip10.derivePath(crypto_1.Slip10Curve.Secp256k1, seed, path).privkey);
});
exports.createPrivKeyFromMnemonic = createPrivKeyFromMnemonic;
