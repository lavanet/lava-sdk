import Logger from "../logger/logger"
import JsonRPCErrors from "./errors"

class JsonRPC {
    private async sendRequest(path:string): Promise<any> {
        const res = await fetch(path,{
            method: "GET",
            headers: {
                Accept: 'application/json'
            }
        })
        if(!res.ok){
            // Return error
            return JsonRPCErrors.errSendingRequest
        }
        return await res.json()
    }

    async getLatestBlock(rest_rpc: string): Promise<number> {
        // Fetch abciInfo from the chain
        const abciInfo = await this.sendRequest(rest_rpc+"/abci_info");
        if (abciInfo instanceof Error){
            throw new Error(abciInfo.message + ", req: " + rest_rpc+"/abci_info")
        }

        // Extract and return blocks height
        return abciInfo.result.response.last_block_height
    }
}

export default JsonRPC