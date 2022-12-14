"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoint = exports.SingleConsumerSession = exports.ConsumerSessionWithProvider = exports.SessionManager = void 0;
class SessionManager {
    constructor(pairingList, nextEpochStart, apis) {
        this.NextEpochStart = nextEpochStart;
        this.PairingList = pairingList;
        this.Apis = apis;
    }
    getCuSumFromApi(name) {
        return this.Apis.get(name);
    }
}
exports.SessionManager = SessionManager;
class ConsumerSessionWithProvider {
    constructor(acc, endpoints, session, maxComputeUnits, usedComputeUnits, reliabilitySent) {
        this.Acc = acc;
        this.Endpoints = endpoints;
        this.Session = session;
        this.MaxComputeUnits = maxComputeUnits;
        this.UsedComputeUnits = usedComputeUnits;
        this.ReliabilitySent = reliabilitySent;
    }
}
exports.ConsumerSessionWithProvider = ConsumerSessionWithProvider;
class SingleConsumerSession {
    constructor(cuSum, latestRelayCu, relayNum, endpoint, pairingEpoch, providerAddress) {
        this.CuSum = cuSum;
        this.LatestRelayCu = latestRelayCu;
        this.SessionId = this.getNewSessionId();
        this.RelayNum = relayNum;
        this.Endpoint = endpoint;
        this.PairingEpoch = pairingEpoch;
        this.ProviderAddress = providerAddress;
    }
    getNewSessionId() {
        const min = 1;
        const max = Number.MAX_SAFE_INTEGER;
        return Math.floor(Math.random() * (max - min) + min);
    }
}
exports.SingleConsumerSession = SingleConsumerSession;
class Endpoint {
    constructor(addr, enabled, connectionRefusals) {
        this.Addr = addr;
        this.Enabled = enabled;
        this.ConnectionRefusals = connectionRefusals;
    }
}
exports.Endpoint = Endpoint;
