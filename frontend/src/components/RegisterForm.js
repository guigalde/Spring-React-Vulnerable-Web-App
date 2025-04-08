import { useState } from "react";
import { request, setAuthHeader } from '../helpers/axios_helper';
import classNames from 'classnames';
import {useNavigate, Link} from 'react-router-dom';
import { UserContext } from "../helpers/user_context";
import { useContext } from "react";

export default function RegisterForm({setUser}){
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [registerUser, setRegisterUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    function handleChange(e) {
        setRegisterUser({ ...registerUser, [e.target.name]: e.target.value });
    }

    function onRegister(event, username, email, password) {
        event.preventDefault();
        request(
            "POST",
            "/register",
            {
                username: username,
                email: email,
                password: password
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                setUser({
                    isLogged: true,
                    username: response.data.username,
                    email: response.data.email,
                    role: response.data.role
                });
                navigate('/');
            }).catch(
            (error) => {
                setAuthHeader(null);
            }
            
        );
    }
    function onSubmitRegister(e) {
        onRegister(e, registerUser.username, registerUser.email, registerUser.password);
    };

    return (
        <div className={classNames("tab-pane", "fade", "show active")} id="pills-register">
            <h1 className="text-center">Register</h1>
            <div className="d-flex justify-content-center" style={{ height: '100vh' }}>
                <form onSubmit={onSubmitRegister} className="w-25">
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="username"><b>Username</b></label>
                    <input type="text" id="registerUsername" name="username" className="form-control col-md-6" onChange={handleChange}/>

                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email"><b>Email</b></label>
                    <input type="text" id="email" name="email" className="form-control col-md-6" onChange={handleChange}/>
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="registerPassword"><b>Password</b></label>
                    <input type="password" id="registerPassword" name="password" className="form-control" onChange={handleChange}/>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <button type="submit" className="btn btn-primary btn-block mb-4" style={{ color: 'black', backgroundColor: '#3CACAE', borderColor: 'black' }}><b>Sign up</b></button>
                    <Link to="/login" className="text-center">
                        <b>Already have an account? Sign in</b>
                    </Link>
                </div>
                </form>
            </div>
            
        </div>
    );
}