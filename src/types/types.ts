export class ConsumerSessionWithProvider {
  Acc: string;
  Endpoints: Array<Endpoint>;
  Session: SingleConsumerSession;
  MaxComputeUnits: number;
  UsedComputeUnits: number;
  ReliabilitySent: boolean;
  PairingEpoch: number;

  constructor(
    acc: string,
    endpoints: Array<Endpoint>,
    session: SingleConsumerSession,
    maxComputeUnits: number,
    usedComputeUnits: number,
    reliabilitySent: boolean,
    pairingEpoch: number
  ) {
    this.Acc = acc;
    this.Endpoints = endpoints;
    this.Session = session;
    this.MaxComputeUnits = maxComputeUnits;
    this.UsedComputeUnits = usedComputeUnits;
    this.ReliabilitySent = reliabilitySent;
    this.PairingEpoch = pairingEpoch;
  }
}

export class SingleConsumerSession {
  CuSum: number;
  LatestRelayCu: number;
  SessionId: number;
  RelayNum: number;
  Endpoint: Endpoint;
  PairingEpoch: number;

  constructor(
    cuSum: number,
    latestRelayCu: number,
    relayNum: number,
    endpoint: Endpoint,
    pairingEpoch: number
  ) {
    this.CuSum = cuSum;
    this.LatestRelayCu = latestRelayCu;
    this.SessionId = this.getNewSessionId();
    this.RelayNum = relayNum;
    this.Endpoint = endpoint;
    this.PairingEpoch = pairingEpoch;
  }

  getNewSessionId(): number {
    // TODO for production need better session generator
    const min = 100000;
    const max = 1000000000000;
    return Math.floor(Math.random() * (max - min) + min);
  }
}

export class Endpoint {
  Addr: string;
  Enabled: boolean;
  ConnectionRefusals: number;
  // TODO Missing Client attribute

  constructor(addr: string, enabled: boolean, connectionRefusals: number) {
    this.Addr = addr;
    this.Enabled = enabled;
    this.ConnectionRefusals = connectionRefusals;
  }
}
