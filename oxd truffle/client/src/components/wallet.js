import React, { Component } from "react";
import Web3 from "web3";
class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <div class="row">
          <div class="col s12 m6">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">My Wallet</span>
                <h4>ETHER</h4>
                {Web3.utils.fromWei(this.props.ethBalance, 'ether')}
                <h4>TokenBalance</h4>
                {this.props.tokenBalance}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Wallet;
