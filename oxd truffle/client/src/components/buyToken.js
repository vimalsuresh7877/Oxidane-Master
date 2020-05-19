import React, { Component } from "react";
class BuyToken extends Component {
  constructor(props){
      super(props)
      this.state={
          etherprice:"0"
      }
  }
  render() {
    return (
      <div>
        <div class="row">
          <div class="col s12 m6">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">Buy Tokens</span>
                <form
                  className="mb-3"
                  onSubmit={(event) => {
                    event.preventDefault();
                    let tokenAmount;
                    let ether;
                    tokenAmount = this.input.value;
                    ether=this.state.etherprice.toString();
                    ether= window.web3.utils.toWei(ether,"Ether")
                   this.props.buyTokens(tokenAmount,ether);
                   this.input.value="";
                   this.setState({etherprice:"0"})
                  }}
                >
            <div class="row">
          <i class="material-icons prefix">account_circle</i>
          <input id="icon_prefix" type="text" class="validate" 
           onChange={(event)=>{
             const tokenAmount=this.input.value.toString()
             this.setState({
               etherprice:tokenAmount/44
             })
           }} 
           ref={(input)=>{this.input=input}} />
          <label for="icon_prefix">Token Amount</label>
          </div>
          <div class="row">
          <i class="material-icons prefix">account_circle</i>
          <input id="icon_prefix" type="text" class="validate" value={this.state.etherprice}/>
          <label for="icon_prefix">Ether Price</label>
          </div>
          <button class="waves-effect waves-light btn" type="submit">Buy</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BuyToken;
