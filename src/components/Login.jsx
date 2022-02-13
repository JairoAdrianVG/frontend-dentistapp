import React from "react";
import Button from 'react-bootstrap/Button';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import Profile from "./Profile";



const Login = () =>{
    const {loginWithRedirect} = useAuth0();

    const {user, isAuthenticated, isLoading} = useAuth0();

    if(isLoading){
      return <div>Loading...</div>
  }


  if(isAuthenticated) {
    return(
      <div>
        <h2>Welcome, {user.name}</h2>
        <br/>
            <img src={user.picture} alt={user.name}></img>
            <br/>
            <p>Email: {user.email}</p>
            <br />
            <Button href='./home' variant="info">Continue to App</Button>
      </div>) 
      } else{
        return(
          <div>
          <Button onClick={() => loginWithRedirect()}>Login</Button>
          </div>
        )
      }

}

export default Login;