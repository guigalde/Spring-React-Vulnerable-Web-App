import  { useState} from 'react';
import classNames from 'classnames';
import { request, setAuthHeader } from '../helpers/axios_helper';
import { Link, useNavigate} from 'react-router-dom';


export default function  LoginForm() {
    const [loginUser, setLoginUser] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const [successLogin, setSuccessLogin] = useState(false);
    function onLogin(e, username, password){
        e.preventDefault();
        request(
            "POST",
            "/api/login",
            {
                username: username,
                password: password
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                setSuccessLogin(true);






                navigate('/');
            }).catch(
            (error) => {
                setAuthHeader(null); 
            }
        );
    };

    function handleChange(e) {
      setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
    }

    function onSubmitLogin(e){
        onLogin(e, loginUser.username, loginUser.password);
        if (successLogin === true) {
          navigate('/');
      }
    };


    return (
      <div className={classNames("tab-pane", "fade", "show active")}>
      <h1 className="text-center">Sign in</h1>
        <div className="d-flex justify-content-center" style={{ height: '100vh' }}>
         <form className='w-25' onSubmit={onSubmitLogin}>
           <div className="form-outline mb-4">
             <label className="form-label" htmlFor="loginUsername"><b>Username</b></label>
             <input type="text" id="loginUsername" name="username" className="form-control col-md-6" onChange={handleChange}/>
           </div>

           <div className="form-outline mb-4">
             <label className="form-label" htmlFor="loginPassword"><b>Password</b></label>
             <input type="password" id="loginPassword" name="password" className="form-control col-md-6" onChange={handleChange}/>
           </div>

           <div className="d-flex flex-column align-items-center">
             <button type="submit" className="btn btn-primary btn-block mb-4"style={{ color: 'black', backgroundColor: '#3CACAE', borderColor: 'black' }}><b>Sign in</b></button>
             <Link to="/register" className="text-center">
               <b>Create an account</b>
             </Link>
           </div>
         </form>
      </div>
     </div>


        );
      }