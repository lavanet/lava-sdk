export class ConsumerSessionWithProvider{
    Acc:string
    Endpoints: Array<Endpoint>
    // TODO missing sessions attribute
    MaxComputeUnits: number
    UsedComputeUnits: number
    ReliabilitySent: boolean
    PairingEpoch: number

    constructor(
        acc:string, 
        endpoints:Array<Endpoint>, 
        maxComputeUnits:number,
        usedComputeUnits:number,
        reliabilitySent:boolean,
        pairingEpoch:number,
    ){
        this.Acc=acc;
        this.Endpoints=endpoints;
        this.MaxComputeUnits=maxComputeUnits;
        this.UsedComputeUnits=usedComputeUnits;
        this.ReliabilitySent=reliabilitySent;
        this.PairingEpoch=pairingEpoch;
    }


}

export class Endpoint{
    Addr:string
    Enabled:boolean
    ConnectionRefusals: number
    // TODO Missing Client attribute

    constructor(addr:string, enabled:boolean, connectionRefusals: number){
        this.Addr = addr
        this.Enabled=enabled
        this.ConnectionRefusals = connectionRefusals
    }

}