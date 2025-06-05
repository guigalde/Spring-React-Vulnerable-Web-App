import { useContext, useState, useEffect } from 'react';
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

    const location = useLocation();

  const [xssStyle, setXssStyle] = useState({borderLeft: '1.5px solid black', borderRight: '1.5px solid black'});
  const [myGamesTabStyle, setMyGamesTabStyle] = useState({borderRight: '1.5px solid black', width: '10vh'});
  const [wishlistTabStyle, setWishlistTabStyle] = useState({borderRight: '1.5px solid black'});
  const [collectionsTabStyle, setCollectionsTabStyle] = useState({borderRight: '1.5px solid black'});

  useEffect(() => {
    if (location.pathname === "/videogames" || location.pathname === "/videogameDetails/*"){
      setXssStyle({borderLeft: '1.5px solid black', borderRight: '1.5px solid black', backgroundColor: '#EEB5EB'});
      setMyGamesTabStyle({borderRight: '1.5px solid black', width: '10vh'});
      setWishlistTabStyle({borderRight: '1.5px solid black'});
      setCollectionsTabStyle({borderRight: '1.5px solid black'});
    }else if (location.pathname === "/myGames" || location.pathname === "/personalVideogameDetails/*"){
      setMyGamesTabStyle({borderRight: '1.5px solid black', backgroundColor: '#EEB5EB', width: '10vh'});
      setXssStyle({borderLeft: '1.5px solid black', borderRight: '1.5px solid black'});
      setWishlistTabStyle({borderRight: '1.5px solid black'});
      setCollectionsTabStyle({borderRight: '1.5px solid black'});
    }else if (location.pathname === "/wishlist"){
      setWishlistTabStyle({borderRight: '1.5px solid black', backgroundColor: '#EEB5EB'});
      setXssStyle({borderLeft: '1.5px solid black', borderRight: '1.5px solid black'});
      setMyGamesTabStyle({borderRight: '1.5px solid black', width: '10vh'});
      setCollectionsTabStyle({borderRight: '1.5px solid black'});
    }else if (location.pathname === "/collections" || location.pathname === "/collection/*"){
      setCollectionsTabStyle({borderRight: '1.5px solid black', backgroundColor: '#EEB5EB'});
      setXssStyle({borderLeft: '1.5px solid black', borderRight: '1.5px solid black'});
      setMyGamesTabStyle({borderRight: '1.5px solid black', width: '10vh'});
      setWishlistTabStyle({borderRight: '1.5px solid black'});
    }
  }, [location]);

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
          {user.id !== null &&
            <>
              <Link to="/vulnerabilities/xss" className="link">
                <div className="nav-item" style={xssStyle}>
                  <b style={{ padding: '20px' }}>XSS</b>
                </div>
              </Link>
              </>
}
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