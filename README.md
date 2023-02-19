<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="./.github/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Lava Access SDK - <i>ALPHA</i></h3>
  </p>
</div>

<b>Access Web3 APIs, the Lava way 🌋</b>
    
JavaScript/TypeScript SDK reference implementation designed for developers looking for access through the Lava Network. It can be added to your app/dapp and run in browsers to provide multi-chain peer-to-peer access to blockchain APIs.

<!-- Roadmap -->
## Roadmap
The SDK is currently in the Alpha stage and is not production-ready for all usecases. 

Roadmap highlights:

1. ~Send Relays per Lava Pairing~ ✅
2. ~Find seed providers for the initial connection~ ✅
3. Integration with EtherJS and other tooling
4. Ability to run in the browser without compromising private keys
5. High throughput via session management
6. Other Lava consensus implementations (e.g. QoS, data reliability, ...)

<!-- Prerequisites -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Installation -->
## Installation

### Prerequisites (Alpha version)
_SDK setup requires additional steps at the moment, but we're working on minimizing prerequisites as we progress through the roadmap._

1. Create a wallet on the Lava Testnet, have LAVA tokens
1. Stake in the chain you want to access
2. Stake in Lava chain

Need help? We've got you covered 😻 Head over to our [Discord](https://discord.gg/5VcqgwMmkA) channel `#developers` and we'll provide testnet tokens and further support

### Yarn

```bash
yarn add lava-sdk
```

### NPM

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


[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Apache 2 License][license-shield]]([license-url])
[![LinkedIn][linkedin-shield]][linkedin-url]


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
