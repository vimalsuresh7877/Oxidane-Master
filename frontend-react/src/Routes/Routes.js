import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Welcomepage from "../components/welcomepage";
import profilepage from "../components/user/profilepage";
import adminpage from "../components/admin/profile";

import Signup from "../components/user/signup";
import PrivateRoute from "./privateroute"                                
const Routes = ()=>{
    return(
        <BrowserRouter>
      
        <Switch>
            <Route path="/" exact component={Welcomepage}/>
            <Route path="/admin" exact component={adminpage}/>
            <PrivateRoute path="/profilepage" exact component={profilepage}/>
            <Route path="/signup" exact component={Signup}/>
        </Switch>
       
        </BrowserRouter>
    )
};
export default Routes