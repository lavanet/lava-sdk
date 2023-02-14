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
exports.fetchLavaPairing = void 0;
function fetchLavaPairing(path) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof window === "undefined") {
            // Running on the server
            const fs = require("fs");
            const configFile = fs.readFileSync(path, "utf-8");
            return JSON.parse(configFile);
        }
        else {
            // Running in the browser
            const response = yield fetch(path);
            return yield response.json();
        }
    });
}
exports.fetchLavaPairing = fetchLavaPairing;
