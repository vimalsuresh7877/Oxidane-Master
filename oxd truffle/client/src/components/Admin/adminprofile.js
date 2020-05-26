import React, { Component } from "react";
import Web3 from "web3";
import Kyc from "../../contracts/Kyc.json";
class Adminprofile extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchaindata();
  }

  // Initializing Web3

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  // Load Blockchaindata

  async loadBlockchaindata() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    //GETTING NETWORKID
    const networkId = await web3.eth.net.getId();

    //CREATING KYC CONTRACT INSTANCE
    const KycData = Kyc.networks[networkId];
    if (KycData) {
      const kycinst = new web3.eth.Contract(Kyc.abi, KycData.address);
      this.setState({ kycinst: kycinst });
    }
  }

  addExchange = () => {
    this.state.kycinst.methods
      .registerExchange(this.state.exchangeaddr)
      .send({ from: this.state.account });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      kycinst: {},
      exchangeaddr: "",
    };
  }
  handleSubmit = async() => {
    await this.state.kycinst.methods
      .registerExchange(this.state.exchangeaddr)
      .send({ from: this.state.account });
  };
  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    return (
      <div className="adminprofile">
        <div className="container">
          <div class="row">
            <div class="col s12 m6">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                  <span class="card-title">Card Title</span>
                  <div class="row">
                   
                      <div class="row">
                        <div class="input-field col s6">
                          <i class="material-icons prefix">account_circle</i>
                          <input
                            name="exchangeaddr"
                            id="icon_prefix"
                            type="text"
                            required
                            class="validate"
                            onChange={this.handleInputChange}
                          />
                          <label for="icon_prefix">Exchange Address</label>
                          <span
                            class="helper-text"
                            data-error="please enter name"
                            data-success="right"
                          >
                            Exchange Address
                          </span>
                        </div>
                      </div>
                      <button
                        class="btn waves-effect waves-light"
                        type="submit"
                        name="action"
                        onClick={this.handleSubmit}
                      >
                        Submit
                        <i class="material-icons right">send</i>
                      </button>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Adminprofile;
