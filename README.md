<h1 align="center">Welcome to Lava SDK!</h1>

A Lava SDK is a complete Lava Network client written in Typescript

### Prerequisites
1. [Docker](https://docs.docker.com/engine/install/ubuntu/) installed locally
2. [Node version 16.](https://github.com/nvm-sh/nvm) installed locally

## Want to try it locally?

1. clone the directory. 
    
    ```bash
    git clone git@github com:lavanet/lava-sdk.git
    ```

2. Install dependencies
    
    ```bash
    yarn install
    ```

3. Start the proxy

    ```bash
    # Build envoy proxy image
    docker build -t envoy:v1 .

    # Run envoy proxy image
    docker run -d --name envoy -p 9901:9901 -p 8081:8081 envoy:v1
    ```

4. Start lava network + provider

    ```bash
    # Clone lava
    git clone git@github.com:lavanet/lava.git

    # Go to lava folder
    cd lava

    # Run network
    ignite chain serve -v -r 2>&1 | grep -e lava_ -e ERR_ -e STARPORT] -e !

    # Init chain commands
    # Copy init_one_provider_lava.sh in lava/scripts
    ./scripts/init_one_provider_lava.sh
    ```
4. Get staked account

    ```bash
    # Fetch private key for staked user
    lavad keys export user4 --unsafe --unarmored-hex

    # Copy private key in the:
    # examples/basic.ts -> privKey
    ```

5. Build lava-sdk

    ```bash
    yarn build
    ```

6. Start lava-sdk

    ```bash
    # Fetch private key for staked user
    yarn server

    # Check the consol you should see 2 responses:
    ```

### Work in progress

1. Remove Proxy

    This version of the sdk depend on the external proxy, which means that you need to pre-input provider address. Currently we are working on moving proxy logic in the provider but till then you must use init_one_provider_lava.sh or it will not work

2. NodeJs version

    There is an issue with latest nodejs version, we are investigating what it is not working, till then please use node 16.

3. Node support

    This version support only Browser usage, we are working on enabling sdk to work both on Browser and Node