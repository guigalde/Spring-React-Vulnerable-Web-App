import  { useState, useEffect} from 'react';
import {  request } from '../../helpers/axios_helper';


export default function CommandInjection(){

    const [output, setOutput] = useState('');

    function executeCommand(){
        var filename = new URLSearchParams(document.location.search).get('filename');
        filename = encodeURIComponent(filename);
        request('GET', '/api/commandInjection?command=' + filename)
                .then(
                    (response) => {
                        setOutput(response.data);
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
            <h1 className="text-center">Command Injection Vulnerable Page</h1>
            <div className="d-flex justify-content-center" style={{ height: '100vh' }}>
                <form className='w-25'>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="inputField"><b>Example text file</b></label>
                        <p>{output}</p>
                    </div>
                </form>
            </div>
        </div>
    );
    
}
