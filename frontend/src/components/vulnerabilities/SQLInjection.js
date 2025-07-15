import  { useState, useEffect} from 'react';
import {  request } from '../../helpers/axios_helper';

export default function SQLInjection(){

    const [output, setOutput] = useState(null);
    const [showTip, setShowTip] = useState(null);

    function executeCommand(){
        var filename = new URLSearchParams(document.location.search).get('objectName');
        filename = encodeURIComponent(filename);
        request('GET', '/api/sqlInjection?objectName=' + filename)
                .then(
                    (response) => {
                        setOutput(response.data);
                        console.log("Response data:", response.data);
                    }).catch(
                    (error) => {
                        console.error("Error obtaining file:", error);                 
                    }
                );
    }

    function createDataStructure(){
        if(output != null){
            return output.map(item => 
                <div className="card m-2" style={{ width: '100%' }}>
                    <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm">
                        <pre className="whitespace-pre-wrap overflow-auto max-h-64">
                            {JSON.stringify(item, null, 2)}
                        </pre>
                    </div>
                </div>
                    );
        }
    }

    useEffect(() => {
        executeCommand();
    }, []);

    return (
            <div className="container" style={{ width: '200vh' }}>
                <h1 className="text-center">SQL Injection Vulnerable  User Listing Page</h1>
                <div className="d-flex justify-content-center">
                    {createDataStructure()}
                </div>
                <div className="d-flex justify-content-center" >
                    <b  className="text-center" onClick={()=>setShowTip(true)}>Display tip</b>
                </div>
                <div className="d-flex justify-content-center" >

                                        {showTip && (
                                            <div className="alert alert-info text-center" role="alert">
                                                <p>The objectName param in the URL is used directly on a query</p>
                                                <button type="button" className="btn-close" onClick={() => setShowTip(false)}></button>
                                            </div>
                                        )}
                </div>  
            </div>
        
    );
}
