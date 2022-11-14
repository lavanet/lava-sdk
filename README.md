<h1 align="center">Welcome to Lava SDK!</h1>

A Lava SDK is a complete Lava Network client written in Typescript


## Installation: 

1. clone the directory. 
    
    ```bash
    git clone git@github com:lavanet/lava-sdk.git
    ```

2. Install dependencies
    
    ```bash
    yarn install
    ```

3. Compile to javascript, and convert to browser compatible JavaScript. 
    
    ```bash
    yarn build
    ```

5. Run lava-sdk

    ```bash
    lava-sdk
    ```
    ```md
    !!! Caution
    If you are having an error  "lava-sdk: command not found", 
    execute Yarn link to create an symlink 
    ```

6. Run unit tests

    Lava SDK is extensively covered with unit tests, to run the tests execute:
    ```bash
    yarn test
    ```

## Prerequisites
To be able to use Lava SDK, you must first create an account and stake to Lava Network

Download the latest Lava binary from https://github.com/lavanet/lava/releases

1. Create an account

   ```bash
    lavad keys add user_name_of_your_chosing
    ```
2. Found account using Lava Faucet

    ```bash
    curl -X POST -d '{"address": "<account_address>"}' <faucet_address>
    ```

4. Check account balance

    ```bash
    lavad q bank balances <account_address> --node <lava_node_address>
    ```

4. Stake

    ```bash
    lavad tx pairing stake-client <network> <amount> 1 -y --from <account_name> --gas "auto" --node <lava_node_address> --keyring-backend <keyring_backend_name>
    ```

5. Verify staking
   
    ```bash
    lavad q pairing clients <network> --node <lava_node_address>
    ```
    
## How to use it 
Current lava-sdk implementation can be used with the terminal and we have an example folder to demonstrate how the sdk will be used 

    ```md
    !!! Caution
    Before continuing to follow the guide, please make sure you finished all the steps in the Prerequisites section
    ```

### Terminal

1. List all supported commands

    ```bash
    lava-sdk --help
    ```

1. Get pairing

    ```bash
    lava-sdk get-pairing --help
    ```
    ```bash
    Usage: Lava SDK get-pairing [options]

    Gets the pairing list for current epoch

    Options:
    -e, --endpoint <endpoint>           An lava node Endpoint
    -c, --chainId <chain-id>            An lava network chain ID
    -p, --privateKey <privateKey>       The client private key
    -r, --rpcInterface <rpc-interface>  A used rpc interface
    -h, --help                          display help for command
    ```

    ```bash
    Example:
    lava-sdk get-paring -e <node_address> -c <chain_id> -p <private_key_staked_account> -r <rpc_interface>
    ```

    ![gif-maker-imgflip-10-november-2022_58WOWHr5_AdobeExpress (1)](https://user-images.githubusercontent.com/42786413/201049338-918c1112-ab74-4258-bdfe-61cea82b80dc.gif)

### Example

All examples are located in the **./src/examples** folder. Currently we support only running **./src/examples/basic.ts** out of the box. 
1. Compile ts -> js

    ```bash
    yarn build
    ```

2. Run example/basic.ts 

    ```bash
    yarn example
    ```