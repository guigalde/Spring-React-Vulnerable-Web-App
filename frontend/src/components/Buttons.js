import * as React from 'react';
import { useContext } from 'react';
import { UserContext } from '../helpers/user_context';
import { Link } from 'react-router-dom';

export default function Buttons({ onLogInClick, onLogOutClick }) {

  const user = useContext(UserContext);

  const handleLogInClick = () => {
    if (typeof onLogInClick === 'function') {
      onLogInClick();
    }
  };

  const handleLogOutClick = () => {
    if (typeof onLogOutClick === 'function') {
      onLogOutClick();
    }
  };

  return (
    <div className="row">
      <div className="col-md-12 text-center" style={{ marginTop: '30px' }}> 
        {user.username === "" ?
        (<Link to="/login">
          <div className="SignInHeader">
            Sign in
          </div>
        </Link>):
        <button className="btn btn-dark" style={{ margin: '10px' }} onClick={handleLogOutClick}>
          Sign Out
        </button>
      }  
      </div>
    </div>
  );
}
