import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom"
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import welcome from "./components/welcome"
import Login from "./components/loginpage" 

import loading from "./components/loading"
import Error from "./components/error"
import {isAuthenticate} from "./Routes/user"

const Routes = ()=>{
    return(
        <BrowserRouter>
      
        <Switch>
            <Route path="/" exact component={welcome}/>
            <Route path="/loginpage" exact component={Login}/>

         
        </Switch>
       
        </BrowserRouter>
    )
};
export default Routes