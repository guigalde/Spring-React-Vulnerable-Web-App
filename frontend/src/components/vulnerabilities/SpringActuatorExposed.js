import  { useState, useEffect} from 'react';
import {  request } from '../../helpers/axios_helper';


export default function SpringActuatorExposed(){

    const [output, setOutput] = useState('');
    const [showTip, setShowTip] = useState(null);

    function executeCommand(){
        var filename = new URLSearchParams(document.location.search).get('endpoint');
        request('GET', '/'+ filename)
                .then(
                    (response) => {
                        console.log("Response data:", response.data);
                        setOutput(JSON.stringify(response.data));
                    }).catch(
                    (error) => {
                        console.error("Error obtaining file:", error);                 
                    }
                );
    }

    useEffect(() => {
        executeCommand();
    }, []);

    return (
        <div className="container">
            <h1 className="text-center">Spring Actuator Exposed Outputs</h1>
            <div className="d-flex justify-content-center">
                <form className='w-75'>
                    <div className="form-outline mb-4">
                        <p>{output}</p>
                    </div>
                </form>
            </div>
            <div className="d-flex justify-content-center" >
                <b  className="text-center" onClick={()=>setShowTip(true)}>Display tip</b>
            </div>
            <div className="d-flex justify-content-center" >

                                {showTip && (
                                    <div className="alert alert-info text-center" role="alert">
                                        <p>Spring actuator is a series of endpoints used to get info of the server during development,
                                             if left open it can be an excellent opportunity to get some information.
                                              By default with the param it shows all actuator endpoints, try changing endpoint to "actuator/mappings" this will return all open endpoints in the server.</p>
                                        <button type="button" className="btn-close" onClick={() => setShowTip(false)}></button>
                                    </div>
                                )}
            </div>
        </div>
    );
    
}