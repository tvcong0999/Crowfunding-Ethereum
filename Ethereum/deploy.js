const HDWalletProvider = require('@truffle/hdwallet-provider');

const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

require('dotenv').config();

// const OPTIONS = {
//     defaultBlock: 'latest',
//     transactionConfirmationBlocks: 1,
//     transactionBlockTimeout: 8
// }
const provider = new HDWalletProvider(
    {
        mnemonic: {
          phrase: 'select all involve trend auto boost major squeeze round yellow furnace pipe'
        },
        providerOrUrl: 'https://rinkeby.infura.io/v3/48e443543ec0470fb19d967a0894b144'
    }   
);
// const provider = new HDWalletProvider(
//     {
//         mnemonic: {
//           phrase: process.env.mnemonic
//         },
//         providerOrUrl: process.env.link
//     }   
// );

const web3 = new Web3(provider);
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attemping to deploy to accounts ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: '0x' + compiledFactory.bytecode })
        .send({ from: accounts[0] });

    console.log('Contract deploy to ', result.options.address);
};

deploy();