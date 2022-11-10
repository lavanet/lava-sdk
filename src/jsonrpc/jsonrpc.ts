import Logger from "../logger/logger"

class JsonRPC {
    private async sendRequest(path:string): Promise<any> {
        const res = await fetch(path,{
            method: "GET",
            headers: {
                Accept: 'application/json'
            }
        })
        if(!res.ok){
            Logger.error("Error sending request")
        }
        return await res.json()
    }

    async getLatestBlock(rest_rpc: string): Promise<number> {
        const abciInfo = await this.sendRequest(rest_rpc+"/abci_info");
        return abciInfo.result.response.last_block_height
    }
}

export default JsonRPC