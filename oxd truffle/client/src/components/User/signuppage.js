import React, { Component } from 'react';
import "../css/signup.css"
class signup extends Component {
    constructor(props){
        super(props)
        this.state={
            name:"",
            adharno:0
        }
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        this.props.setCustomer(this.state.name,this.state.adharno)
    }
     handleInputChange=(event)=>{
    event.preventDefault()
    this.setState({
        [event.target.name]:event.target.value
    })
     }
    render() { 
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
          <input name="name" id="icon_prefix" type="text" required class="validate" onChange={this.handleInputChange}/>
          <label for="icon_prefix">First Name</label>
          <span class="helper-text" data-error="please enter name" data-success="right">Name</span>
        </div>
        </div>
        <div class="row">
        <div class="input-field col s6">
          <i class="material-icons prefix">phone</i>
          <input name="adharno" id="icon_telephone" type="number" required class="validate" onChange={this.handleInputChange}/>
          <label for="icon_telephone">Telephone</label>
          <span class="helper-text" data-error="please enter adharno" data-success="right">Adhar no</span>
        </div>
     </div>
    
      <button class="btn waves-effect waves-light" type="submit" name="action">Submit
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
        )
}
}
export default signup;