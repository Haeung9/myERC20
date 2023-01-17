var MyContract = artifacts.require("ERC20");

module.exports = async function(deployer, network) {
  // deployment steps
  await deployer.deploy(MyContract, "LiberVanceTest", "LVT")
  const instance = await MyContract.deployed();
  const deployedAddress = instance.address;
  
  const deployedName = await instance.name();
  Promise.all([deployedAddress, deployedName]).then(function() {
    console.log("The contract is deployed on " + network + ", at address: " + deployedAddress)
    console.log("Contract name: " + deployedName);
  }).catch(function(error) {
    console.log(error);
  })
};