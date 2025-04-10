import * as React from 'react';
import { getUserInfo } from '../helpers/axios_helper';


export function WelcomeContent(){
  const user = {
      id: getUserInfo().id,
      username: getUserInfo().sub,
      email: getUserInfo().email,
      role: getUserInfo().role
  };
    return (
        <div className="row justify-content-md-center">
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                {user.username ? <h1 className="display-4">Welcome back, {user.username}!</h1> :<>
                <h1 className="display-4">Welcome to this Vulnerable Web App</h1>
                <p className="lead">Login to get the full experience.</p></>}
              </div>
            </div>
        </div>
    );
  }