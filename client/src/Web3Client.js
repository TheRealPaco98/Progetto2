import StoreBuild from './truffle/build/contracts/Store.json';

var Web3 = require('web3');
let selectedAccount;
let storeContract;
let isInitialized = false;


export const init = async () => {
    let provider = window.ethereum;

    if (typeof provider !== 'undefined') {
    
    provider
    .request({method: 'eth_requestAccounts' })
    .then((accounts) => {
      selectedAccount = accounts[0];
      console.log(`Selected account is ${selectedAccount}`);
    })
    .catch((err) => {
      console.log(err);
    });
    window.ethereum.on('accountsChanged', function (accounts){
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
  }
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  storeContract = new web3.eth.Contract(StoreBuild.abi,StoreBuild.networks[networkId].address);
  isInitialized = true;
};

export async function setHash(value) {
  if (!isInitialized) {
    await init();
  }
  return storeContract.methods.set(value).send({from: selectedAccount});
}

export async function readHash(){
  if (!isInitialized) {
    await init();
  }
  return storeContract.methods.get().call((err,result)=>{console.log('stored cid in smart contract:',result)});
  
}