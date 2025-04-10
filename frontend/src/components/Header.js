import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserInfo, request } from '../helpers/axios_helper';
import { Link } from 'react-router-dom';

export default function Header({logoSrc, pageTitle, onLogOutClick}) {
    const user = {
      id: getUserInfo().id,
      username: getUserInfo().sub,
      email: getUserInfo().email,
      role: getUserInfo().role
    };

    const navigate = useNavigate();


    function onLogOutClick(){
      window.localStorage.removeItem("auth_token");
      navigate("/");
    }
  return (
      <nav className="d-flex justify-content-between align-items-center App-header">
        <div className="d-flex align-items-center">
          <Link to="/">
            <img src={logoSrc} className="App-logo" alt="logo" />
          </Link>
          <h1 className="App-title">{pageTitle}</h1>
        </div>
        <div className="align-items-center" style={{
                width: '30%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
          {!user.username ? (
            <Link to="/login">
              <button className="btn btn-secondary" type="button" style={{ color: 'white', backgroundColor: '#3CACAE', borderColor: 'black' }}>
                <b>Sign in</b>
              </button>
            </Link>
          ) : (
            <>              
              <div className="dropdown">
                <button onClick={onLogOutClick} className="btn btn-secondary" type="button" id="dropdownMenuButton"  style={{ color: 'white', backgroundColor: '#3CACAE', borderColor: 'black' }}>
                  <b>{user.username}: Log Out</b>
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    );
  }