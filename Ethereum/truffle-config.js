// const HDWalletProvider = require("@truffle/hdwallet-provider");

// const mnemonicPhrase = "select all involve trend auto boost major squeeze round yellow furnace pipe";

// module.exports = {
//   networks: {
//     development: {
//       host: "localhost",
//       port: 8545,
//       network_id: "*" // Match any network id
//     },
//     ropsten: {
//       // must be a thunk, otherwise truffle commands may hang in CI
//       provider: () =>
//         new HDWalletProvider({
//           mnemonic: {
//             phrase: mnemonicPhrase
//           },
//           providerOrUrl: "https://rinkeby.infura.io/v3/c7428c4bd0d54f97b5b9b6c86b2b5a47",
//           numberOfAddresses: 1,
//           shareNonce: true,
//           derivationPath: "m/44'/1'/0'/0/"
//         }),
//       network_id: '3',
//     }
//   }
// };