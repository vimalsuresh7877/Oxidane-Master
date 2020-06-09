import React, { Component } from "react";
import {loadWeb3} from "../../functions/helper"
import { Redirect } from "react-router-dom";
import Kyc from "../../contracts/Kyc.json";
const uuidv1 = require("uuid");
var jwt = require("jsonwebtoken");


class signup extends Component {
  async componentWillMount() {
    await loadWeb3();
    await this.BlockchaindataInit();
    await this.authenticate();
  }
 
  async BlockchaindataInit() {
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
  authenticate = async () => {
    let kycaddr = await this.state.kycinst.methods
      .registration(this.state.account)
      .call();

    if (kycaddr.acountno === this.state.account) {
      this.setState({ registered: true });
      const secret = uuidv1;
      const salt = secret.toString();
      const token = jwt.sign({ _id: this.state.account }, salt);
      if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(token));
      }
    }
  };
  setCustomer = async (_name, _adharno) => {
    this.state.kycinst.methods
      .signup(_name, _adharno)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
       this.authenticate();
       
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      kycinst: {},
      registered: false,
      name: "",
      adharno: 0,
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setCustomer(this.state.name, this.state.adharno);
  };
  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    if (this.state.registered) {
      return <Redirect to="/profilepage" />;
    } else {
      return (
        <div className="signup">
          <div className="container">
            <div class="row">
              <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                  <div class="card-content white-text">
                    <span class="card-title">Card Title</span>
                    <div class="row">
                      <form onSubmit={this.handleSubmit} class="col s12">
                        <div class="row">
                          <div class="input-field col s6">
                            <i class="material-icons prefix">account_circle</i>
                            <input
                              name="name"
                              id="icon_prefix"
                              type="text"
                              required
                              class="validate"
                              onChange={this.handleInputChange}
                            />
                            <label for="icon_prefix">First Name</label>
                            <span
                              class="helper-text"
                              data-error="please enter name"
                              data-success="right"
                            >
                              Name
                            </span>
                          </div>
                        </div>
                        <div class="row">
                          <div class="input-field col s6">
                            <i class="material-icons prefix">phone</i>
                            <input
                              name="adharno"
                              id="icon_telephone"
                              type="number"
                              required
                              class="validate"
                              onChange={this.handleInputChange}
                            />
                            <label for="icon_telephone">Telephone</label>
                            <span
                              class="helper-text"
                              data-error="please enter adharno"
                              data-success="right"
                            >
                              Adhar no
                            </span>
                          </div>
                        </div>

                        <button
                          class="btn waves-effect waves-light"
                          type="submit"
                          name="action"
                        >
                          Submit
                          <i class="material-icons right">send</i>
                        </button>
                      </form>
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
}

export default signup;
