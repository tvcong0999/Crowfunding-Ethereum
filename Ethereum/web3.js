import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // we are in the browser and meta mask is installed
    window.web3.currentProvider.enable();
    web3 = new Web3(window.web3.currentProvider);
} else {
    // we are on the server *OR* meta mask is not running
    // creating our own provider
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/a4b52b1122854f89a37329648bb52626'
    );

    web3 = new Web3(provider);
}

export default web3;