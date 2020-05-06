import React, { Component } from "react";
import Welcome from "./components/welcome";
import Navbar from "./components/navbar";
import "./App.css";

class App extends Component {
   componentDidMount = async () => {
   
  };

render() {
  return(
    <div>
    <Navbar/>
   <Welcome/>
   </div>
  )
  }
}

export default App;
