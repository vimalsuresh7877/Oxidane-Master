import React, { Component } from 'react';
import Web3 from "web3";
import OxidaneToken from "../contracts/OxidaneToken.json"
import TokenSale from "../contracts/TokenSale.json"
class Profilepage extends Component {
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
       } 
       // Get network provider and web3 instance.
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

      //load Blockchaindata
          async loadBlockchainData(){
            const web3 = window.web3
    
            const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
    
        const ethBalance = await web3.eth.getBalance(this.state.account)
        this.setState({ ethBalance })
    
        //GETTING NETWORKID
          const networkId =  await web3.eth.net.getId()
    
          //CREATING TOKEN CONTRACT INSTANCE
          const tokenData = OxidaneToken.networks[networkId]
    if(tokenData)
    {
      const token =new web3.eth.Contract(OxidaneToken.abi,tokenData.address)
      this.setState({token})
      let tokenBalance =await token.methods.balanceOf(this.state.account).call()
      this.setState({tokenBalance:tokenBalance.toString()})
    }else{
      window.alert("Token contract not deployed to network")
    }
    
    //CREATING TOKENSALE CONTRACT INSTANCE
    const tokensaleData = TokenSale.networks[networkId]
    if(tokensaleData){
      const tokensale =new web3.eth.Contract(TokenSale.abi,tokensaleData.address)
      this.setState({tokensale})
     
    }else{
      window.alert("Tokensale contract not deployed to network")
    }
    
    this.setState({loading:false });
          }
         
    buyTokens=(etherAmount)=>{
      this.setState({loadind:true})
      this.state.tokensale.methods.buytokens().send({value:etherAmount,from:this.state.account}).on("transactionHash",(hash)=>{
        this.setState({loading:false})
      })
    }
    setCustomer=(_name,_adharno)=>{
      console.log(_name,_adharno)
       this.state.kycinst.methods.signup(_name,_adharno).send({from:this.state.account}).on("transactionHash",(hash)=>{
        this.setState({loading:false}) });
     
    }
    constructor(props) {
      super(props);
      this.state = {
        account:'',
        ethBalance:"0" ,
        token: {},
        tokensale: {},
        tokenBalance:"0",
       registered:false,
       kycinst:{}
      };
    }
    render() { 
        return ( 
            <h1>hello im profile page</h1>
         );
    }
}
 
export default Profilepage;