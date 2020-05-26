import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom"
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import welcome from "./components/welcome"
import Login from "./components/User/loginpage" 

import Admin from "./components/Admin/adminprofile"

const Routes = ()=>{
    return(
        <BrowserRouter>
      
        <Switch>
            <Route path="/" exact component={welcome}/>
            <Route path="/loginpage" exact component={Login}/>
            <Route path="/admin" exact component={Admin}/>

        </Switch>
       
        </BrowserRouter>
    )
};
export default Routes