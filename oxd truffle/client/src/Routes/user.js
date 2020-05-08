import Web3 from "web3";
import Kyc from "../contracts/kyc.json"
async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

 export const isAuthenticate=async()=>{
      await loadWeb3();
      let registered;
      let account;
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
     account= accounts[0]

const ethBalance = await web3.eth.getBalance(account)


//GETTING NETWORKID
  const networkId =  await web3.eth.net.getId()

//CREATING KYC CONTRACT INSTANCE
const KycData = Kyc.networks[networkId]
if(KycData){
const kycinst=new web3.eth.Contract(Kyc.abi,KycData.address)
let kycaddr= await kycinst.methods.registration(account).call()

if(kycaddr.acountno===account){
registered=true
}
else{
  registered=false
}
}
return registered
}