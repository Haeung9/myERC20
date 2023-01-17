# myERC20
Forked from: https://github.com/OpenZeppelin/openzeppelin-contracts.git

## Install
```
yarn install
```

## Test
```
yarn test
```
## Deploy to local dev testnet
```
yarn testDeploy
```
## Deploy to WorldLand testnet
### 1. Set account
Create `.env` file at the root directory.  
@Windows:  
```
echo NULL > .env
```
@Linux:
```
touch .env
```
Write your 12-word secret prase (or mnemonic) In the `.env` file. If you don't have, you can create one by using Metamask wallet (Chrome extension).  
For example:  
```
MNEMONIC: avocado avocado avocado avocado avocado avocado avocado avocado avocado avocado avocado avocado
```
Warning! DO NOT disclose your mnemonic.  
### 2. Deploy
```
yarn deploy
```

## Get information from your deployed contract
### 1. Set contract address and Txhash (of deploying transaction)
Write your deployed contract address and Txhash in `.env` file. For example:  
```
CONTRACT_ADDRESS: 0x511DB00D13Cb58B07213Fc640F1Da20E0da0765C
TXHASH: 0x3213f92e9b3a001ece18c1b72731392ef05486595c606bd9c5df0618b8a18e34
```
### 2. Get information from contract
```
yarn evaluate
```
If you deployed your own contract, modify `index.js` file at the root directory.  