<a name="readme-top"></a>


[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Apache 2 License][license-shield]]([license-url])
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="./.github/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Lava Access SDK</h3>

  <p align="center">
    JavaScript/TypeScript SDK reference implementation designed for developers looking for access through the Lava Network. It can be added to your app/dapp and run in browsers to provide multi-chain peer-to-peer access to blockchain APIs.
    <br />
    <br />
    <a href="https://github.com/lavanet/lava-sdk/issues"><strong>Issue tracking</strong></a>
    <br />
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
     <li>
      <a href="#prerequisites">Prerequisites</a>
    </li>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#troubleshooting">Troubleshooting</a>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Lava Access SDK ("SDK") is a TypeScript implementation of the Lava Protocol, which enables direct communication between developers and providers via peer-to-peer connections. 

With the SDK, you can easily integrate decentralized access into your projects by importing the library. Behind the scenes, the SDK handles all the necessary operations to implement the Lava Protocol and establishes a peer-to-peer connection with providers on the network. 
This allows developers to focus on building their applications, while the SDK takes care of the underlying communications and connection management.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Prerequisites -->
## Prerequisites
- Determine which blockchain network you want to query
  - Check the list of supported chains and their IDs at [supportedChains](https://github.com/lavanet/lava-sdk/blob/main/supportedChains.json)
- Stake on the Lava network as a client for the chosen chain (more details in [Docs](https://docs.lavanet.xyz/))

ℹ️ Successful relays will be deducted from your stake

❓ Need help staking or initial setup? We've got you covered 😻 Head over to our [Discord](https://discord.gg/5VcqgwMmkA) and we'll provide testnet tokens and further support


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Installation -->
## Installation

You can install the SDK either using [Yarn](https://yarnpkg.com/package/web3) or using [NPM](https://www.npmjs.com/package/web3)

### Yarn

```bash
yarn add lava-sdk
```

### Using NPM

```bash
npm install lava-sdk
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

A single instance of the SDK establishes a connection with a specific blockchain network using a single RPC interface. _Need multiple chains or use multiple RPC interfaces? Create multiple instances._ 

To use the SDK, you will first need to initialize it.

```typescript
const lavaSDK = await new LavaSDK({
  privateKey: privKey,
  chainID: chainID,
  lavaEndpoint: endpoint, // Optional
  rpcInterface: rpcInterface, // Optional
});
```

- `privateKey` parameter is required and should be the private key of the staked Lava client for the specified `chainID`.

- `chainID` parameter is required and should be the ID of the chain you want to query. You can find all supported chains with their IDs [supportedChains](https://github.com/lavanet/lava-sdk/blob/main/supportedChains.json)

- `lavaEndpoint` is an optional field that specifies the RPC endpoint of the Lava network node. It is used to fetch list of the providers for specified `chainID` and `rpcInterface`. You can check the [default lava rpc endpoint](https://github.com/lavanet/lava-sdk/blob/main/src/config/default.ts#L1)

- `rpcInterface` is an optional field representing the interface that will be used for sending relays. For cosmos chains it can be `tendermintRPC` or `rest`. For evm compatible chains `jsonRPC` or `rest`. You can find the list of all default rpc interfaces [supportedChains](https://github.com/lavanet/lava-sdk/blob/main/supportedChains.json)

---

### TendermintRPC / JSON-RPC interface:
```typescript
  const blockResponse = await lavaSDK.sendRelay({
    method: "block",
    params: ["5"],
  });
```
Here, `method` is the RPC method and `params` is an array of strings representing parameters for the method.

You can find more examples for tendermintRPC sendRelay calls [TendermintRPC examples](https://github.com/lavanet/lava-sdk/blob/main/examples/tendermintRPC.ts)

### Rest API interface:
```typescript
const data = await lavaSDK.sendRelay({
  method: "GET",
  url: "/cosmos/bank/v1beta1/denoms_metadata",
  data: {
    "pagination.count_total": true,
    "pagination.reverse": "true",
  },
});
```
In this case, `method` is the HTTP method (either GET or POST), `url` is the REST endpoint, and `data` is the query data.

You can find more examples for rest sendRelay calls [Rest examples](https://github.com/lavanet/lava-sdk/blob/main/examples/restAPI.ts)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Troubleshooting -->
## Troubleshooting

### <b> Webpack >= 5 </b>
If you are using `create-react-app` version 5 or higher, or `Angular` version 11 or higher, you may encounter build issues. This is because these versions use `webpack version 5`, which does not include Node.js polyfills.

#### <b> Create-react-app solution </b>
#### <b> Angular solution </b>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Copyright 2022 Lava Network

Licensed under the Apache License, Version 2.0 (the “License”); you may not use this file except in compliance with the
License. You may obtain a copy of the License at


```
http://www.apache.org/licenses/LICENSE-2.0
```

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an “
AS IS” BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific
language governing permissions and limitations under the License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/lavanet/lava-sdk.svg?style=for-the-badge
[contributors-url]: https://github.com/lavanet/lava-sdk/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/lavanet/lava-sdk.svg?style=for-the-badge
[forks-url]: https://github.com/lavanet/lava-sdk/network/members
[stars-shield]: https://img.shields.io/github/stars/lavanet/lava-sdk.svg?style=for-the-badge
[stars-url]: https://github.com/lavanet/lava-sdk/stargazers
[issues-shield]: https://img.shields.io/github/issues/lavanet/lava-sdk.svg?style=for-the-badge
[issues-url]: https://github.com/lavanet/lava-sdk/issues
[license-shield]: https://img.shields.io/github/license/lavanet/lava-sdk.svg?style=for-the-badge
[license-url]: https://github.com/lavanet/lava-sdk/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/company/lava-network/
