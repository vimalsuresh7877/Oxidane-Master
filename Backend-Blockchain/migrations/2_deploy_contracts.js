const OxidaneToken= artifacts.require("OxidaneToken");
const TokenSale= artifacts.require("TokenSale");
const Kyc= artifacts.require("Kyc");

module.exports = async function(deployer) {
  
  await deployer.deploy(OxidaneToken);
  const token = await OxidaneToken.deployed()


  await deployer.deploy(TokenSale,token.address);
  const tokensale = await TokenSale.deployed()

await token.transfer(tokensale.address,"1000000000000000000000000")
await deployer.deploy(Kyc);
const kyc=await Kyc.deployed();
};

