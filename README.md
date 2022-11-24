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
Current lava-sdk implementation can be used only inside browser

    ```md
    !!! Caution
    Before continuing to follow the guide, please make sure you finished all the steps in the Prerequisites section
    ```

### Example src
*(Doesn't work now, fix in progress)*

All examples are located in the **./src/examples** folder. Currently we support only running **./src/examples/basic.ts** out of the box. 
1. Compile ts -> js

    ```bash
    yarn build
    ```

2. Run example/basic.ts 

    ```bash
    yarn example
    ```

### Browser


1. Compile ts -> js

    ```bash
    yarn build
    ```

2. Run example/basic.ts in browser

    ```bash
    yarn server
    ```
3. Check console
