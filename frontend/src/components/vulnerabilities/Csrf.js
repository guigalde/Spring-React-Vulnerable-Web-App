import  { useState, useRef, useEffect} from 'react';
import { getUserInfo, request, setAuthHeader } from '../../helpers/axios_helper';



export default function Csrf(){

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [showTip, setShowTip] = useState(false);

    const user = {
          id: getUserInfo().id,
          username: getUserInfo().sub,
          email: getUserInfo().email,
          role: getUserInfo().role
        };

    function changePassword(){
        console.log({username:user.username, password: oldPassword})
        request('GET', '/api/changePassword?newPassword='+newPassword+'&oldPassword='+oldPassword+'&username='+user.username)
        .then(
                    (response) => {
                        setAuthHeader(response.data.token);
                        alert("Password changed successfully!");
                    }).catch(
                    (error) => {
                        console.error("Error changing password:", error);                 
                    }
                );


    }

    return (
        <div className="container">
            <h1 className="text-center">CSRF Vulnerable Password Change</h1>
            <div className="d-flex justify-content-center" style={{ height: '100vh' }}>
                <form className='w-25'>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="inputField"><b>Old Password</b></label>
                        <input type="text" id="inputField" name="inputValue" className="form-control col-md-6" onChange={(e) => setOldPassword(e.target.value)} />
                        <label className="form-label" htmlFor="inputField"><b>New Password</b></label>
                        <input type="text" id="inputField" name="inputValue" className="form-control col-md-6" onChange={(e) => setNewPassword(e.target.value)} />
                        <button type="button" className="btn btn-primary mt-2" onClick={() => changePassword()}>Change Password</button>
                    </div>
                    <b  className="text-center" onClick={()=>setShowTip(true)}>Display tip</b>
                    {showTip && (
                        <div className="alert alert-info text-center" role="alert">
                            <p>Check out the request being sent to the backend server</p>
                            <button type="button" className="btn-close" onClick={() => setShowTip(false)}></button>
                        </div>
                    )}
                </form>
                
            </div>
        </div>
    );
}