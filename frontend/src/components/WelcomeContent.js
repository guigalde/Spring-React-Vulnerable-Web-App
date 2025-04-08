import * as React from 'react';
import { useContext } from 'react';
import { UserContext } from '../helpers/user_context';

export function WelcomeContent(){
    const user = useContext(UserContext);
    return (
        <div className="row justify-content-md-center">
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                {user.isLogged ? <h1 className="display-4">Welcome back, {user.username}!</h1> :<>
                <h1 className="display-4">Welcome to GameVault, an app made for managing videogame collections!</h1>
                <p className="lead">Login to get the full experience.</p></>}
              </div>
            </div>
        </div>
    );
};