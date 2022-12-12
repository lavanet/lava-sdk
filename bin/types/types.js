"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoint = exports.SingleConsumerSession = exports.ConsumerSessionWithProvider = exports.Session = void 0;
class Session {
    constructor(pairingList, nextEpochStart) {
        this.NextEpochStart = nextEpochStart;
        this.PairingList = pairingList;
    }
}
exports.Session = Session;
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
    constructor(cuSum, latestRelayCu, relayNum, endpoint, pairingEpoch, account) {
        this.CuSum = cuSum;
        this.LatestRelayCu = latestRelayCu;
        this.SessionId = this.getNewSessionId();
        this.RelayNum = relayNum;
        this.Endpoint = endpoint;
        this.PairingEpoch = pairingEpoch;
        this.Account = account;
    }
    getNewSessionId() {
        // TODO for production need better session generator
        const min = 100;
        const max = 10000000000;
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
