require('dotenv').config();
var Web3 = require('web3');
const ERC20 = require('./build/contracts/ERC20.json');

const HDWalletProvider = require('@truffle/hdwallet-provider');
const MNEMONIC = process.env.MNEMONIC;
const Provider = new HDWalletProvider(MNEMONIC, `https://rpc.lvscan.io`)
var web3 = new Web3(Provider);

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const TXHASH = process.env.TXHASH;

var receipt = web3.eth.getTransactionReceipt(TXHASH);
var contract = new web3.eth.Contract(ERC20.abi, CONTRACT_ADDRESS);

async function informationGetter() {
    let tokenName = await contract.methods.name().call();
    let symbol = await contract.methods.symbol().call();
    let decimals = await contract.methods.decimals().call();
    Promise.all([tokenName, symbol, decimals]).then(function() {
        console.log("Token Name : " + tokenName);
        console.log("Token Symbol : " + symbol);
        console.log("Decimal : " + decimals);
    });
}

console.log("Fetching...");
informationGetter().then(function() {
    receipt.then(function() {console.log(receipt)});
    Provider.engine.stop();
})
