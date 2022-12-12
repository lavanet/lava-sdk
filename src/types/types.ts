export class Session {
  PairingList: ConsumerSessionWithProvider[];
  NextEpochStart: Date;

  constructor(
    pairingList: ConsumerSessionWithProvider[],
    nextEpochStart: Date
  ) {
    this.NextEpochStart = nextEpochStart;
    this.PairingList = pairingList;
  }
}

export class ConsumerSessionWithProvider {
  Acc: string;
  Endpoints: Array<Endpoint>;
  Session: SingleConsumerSession;
  MaxComputeUnits: number;
  UsedComputeUnits: number;
  ReliabilitySent: boolean;

  constructor(
    acc: string,
    endpoints: Array<Endpoint>,
    session: SingleConsumerSession,
    maxComputeUnits: number,
    usedComputeUnits: number,
    reliabilitySent: boolean
  ) {
    this.Acc = acc;
    this.Endpoints = endpoints;
    this.Session = session;
    this.MaxComputeUnits = maxComputeUnits;
    this.UsedComputeUnits = usedComputeUnits;
    this.ReliabilitySent = reliabilitySent;
  }
}

export class SingleConsumerSession {
  Account: string;
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
    pairingEpoch: number,
    account: string
  ) {
    this.CuSum = cuSum;
    this.LatestRelayCu = latestRelayCu;
    this.SessionId = this.getNewSessionId();
    this.RelayNum = relayNum;
    this.Endpoint = endpoint;
    this.PairingEpoch = pairingEpoch;
    this.Account = account;
  }

  getNewSessionId(): number {
    // TODO for production need better session generator
    const min = 100;
    const max = 10000000000;
    return Math.floor(Math.random() * (max - min) + min);
  }
}

export class Endpoint {
  Addr: string;
  Enabled: boolean;
  ConnectionRefusals: number;

  constructor(addr: string, enabled: boolean, connectionRefusals: number) {
    this.Addr = addr;
    this.Enabled = enabled;
    this.ConnectionRefusals = connectionRefusals;
  }
}
