import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';

const Profile = () =>{
    const {user, isAuthenticated, isLoading} = useAuth0();
    const {logout} = useAuth0();

    if(isLoading){
        return <div>Loading...</div>
    }

    return(
        isAuthenticated && (
            <div>
                <img src={user.picture} alt={user.name}></img>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
                <Button variant="danger" onClick={() => logout({returnTo: window.location.origin})}>Logout</Button>
            </div>
        )
    );
};

export default Profile;