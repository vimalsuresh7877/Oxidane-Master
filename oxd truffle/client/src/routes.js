import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom"
import welcome from "./components/welcome"
import Userroute from "./Routes/userRoute"
import Profile from "./components/profile" 

const Routes = ()=>{
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={welcome}/>
            <Userroute path="/login" exact component={Profile} />
        </Switch>
        </BrowserRouter>
    )
};
export default Routes