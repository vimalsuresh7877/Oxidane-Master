import React from 'react';
import {Route,Redirect} from "react-router-dom";
import {isAuthenticate} from "./user";

const UserRoute =({component:Component,...rest})=>{
  return(
      <Route
      {...rest}
render={props =>
    isAuthenticate()?(
        <Component {...props}/>
    ):(
    <Redirect to={{
        pathanme:"/signin",
        
    }}
      />
)
    }
    />
  );  
};
export default UserRoute;