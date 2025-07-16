import logo from './logo.png';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';

import { WelcomeContent } from './components/WelcomeContent';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Xss from './components/vulnerabilities/Xss';
import Csrf from './components/vulnerabilities/Csrf';
import CommandInjection from './components/vulnerabilities/CommandInjection';
import SQLInjection from './components/vulnerabilities/SQLInjection';
import UnrestrictedFileUpload from './components/vulnerabilities/UnrestrictedFileUpload';
import SpringActuatorExposed from './components/vulnerabilities/SpringActuatorExposed';




import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  });


  return (

      <div className="App">
        <Header 
          pageTitle= "VulnerableWebApp" 
          logoSrc= {logo}
        />
        <div className="AppContent" style={{height:'100%', width:'100%'}}>
          <Routes>
            <Route path="/login" exact element={<LoginForm/>}/>          
            <Route path="/register" exact element={<RegisterForm/>}/>
            <Route path="/" exact element={<WelcomeContent/>}/>
            <Route path="/vulnerabilities/xss" exact element={<Xss/>}/>
            <Route path="/vulnerabilities/csrf" exact element={<Csrf/>}/>
            <Route path="/vulnerabilities/commandInjection/:options" exact element={<CommandInjection/>}/>
            <Route path="/vulnerabilities/sqlInjection/:options" exact element={<SQLInjection/>}/>
            <Route path="/vulnerabilities/fileUpload" exact element={<UnrestrictedFileUpload/>}/>
            <Route path="/vulnerabilities/actuatorExposed/:options" exact element={<SpringActuatorExposed/>}/>


          </Routes>
        </div>
      </div>
        );


}

export default App;