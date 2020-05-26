import React, { Component } from 'react';
import Web3 from "web3";
import OxidaneToken from "../../contracts/OxidaneToken.json"
import TokenSale from "../../contracts/TokenSale.json"
import Wallet from "./wallet"
import BuyToken from "./buyToken"
import SellToken from "./sellToken"
import TokenExchange from "./tokenExchange"
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
      this.setState({tokensale:tokensale, tokensaleaddr:tokensaleData.address})
     
    }else{
      window.alert("Tokensale contract not deployed to network")
    }
    
    this.setState({loading:false });
          }
         
    buyTokens=(tokenAmount,etherAmount)=>{
      this.setState({loadind:true})
      this.state.tokensale.methods.buytokens(tokenAmount).send({value:etherAmount,from:this.state.account}).on("transactionHash",(hash)=>{
        this.loadBlockchainData()
      })
    }
    sellTokens = (tokenAmount) => {
      
      this.state.token.methods.approve(this.state.tokensaleaddr, tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.state.tokensale.methods.sellTokens(tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.loadBlockchainData()
          
        })
      })
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
       kycinst:{},
       currentpage:"buy",
       tokensaleaddr:""
      };
    }
    render() 
    
    { 
      let content;
      if(this.state.currentpage=="buy"){
        content=<BuyToken buyTokens={this.buyTokens}/>
      }
      else if (this.state.currentpage=="sell"){
        content=<SellToken  tokensaleaddr={this.state.tokensaleaddr} sellTokens={this.sellTokens}/>
      }
      else{
        content=<TokenExchange/>
      }
        return ( 
          <div>
            <Wallet ethBalance={this.state.ethBalance} tokenBalance={this.state.tokenBalance}/>
            <div className="container">
            <div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Card Title</span>
          <button class="waves-effect waves-light btn" onClick={(event)=>{this.setState({currentpage:"buy"})}}>Buy</button>
          <button class="waves-effect waves-light btn" onClick={(event)=>{this.setState({currentpage:"sell"})}} >Sell</button>
          <button class="waves-effect waves-light btn" onClick={(event)=>{this.setState({currentpage:"exchange"})}}>Exchange</button>
        </div>
        <div class="card-action">
          {content}
        </div>
      </div>
    </div>
  </div>
            </div>
            </div>
         );
    }
}
 
export default Profilepage;