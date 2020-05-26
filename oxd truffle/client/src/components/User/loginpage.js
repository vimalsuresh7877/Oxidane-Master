import React, { Component } from 'react';
import Web3 from "web3";
import Kyc from "../../contracts/Kyc.json"
import  Profilepage from "./profilepage";
import Signup from "./signuppage";

class profile extends Component {
    async componentWillMount(){
        await this.loadWeb3()
        await this.isAuthenticate()
    }
    async loadWeb3() {
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
     async isAuthenticate(){
      const web3 = window.web3
  
      const accounts = await web3.eth.getAccounts()
      this.setState({account:accounts[0]}) 
  
   //GETTING NETWORKID
    const networkId =  await web3.eth.net.getId()
  
  //CREATING KYC CONTRACT INSTANCE
  const KycData = Kyc.networks[networkId]
  if(KycData){
  const kycinst=new web3.eth.Contract(Kyc.abi,KycData.address)
  this.setState({kycinst:kycinst})
  }
  let kycaddr= await this.state.kycinst.methods.registration(this.state.account).call()
  
  if(kycaddr.acountno===this.state.account){
  this.setState({registered:true})
  }
 

  
  } 
  setCustomer= async(_name,_adharno)=>{
    console.log(_name,_adharno)
     this.state.kycinst.methods.signup(_name,_adharno).send({from:this.state.account}).on("transactionHash",(hash)=>{
      this.setState({registered:true}) })
   
  }
  constructor(props){
      super (props)
      this.state={
          account:"",
          kycinst:{},
          registered:false,
         
      }
  }

  
    render()
    

     { 
         let content
        if(this.state.registered){
    content=<Profilepage/>
        }
        else{
            content=<Signup setCustomer={this.setCustomer}/>
        }
        return ( 
            content
         );
    }
}
 
export default profile;