import  { useState, useRef, useEffect} from 'react';
import {  request } from '../../helpers/axios_helper';



export default function UnrestrictedFileUpload(){
    
    const [file, setFile] = useState(null);

    const [showTip, setShowTip] = useState(null);
    
    function handleFileChange(event) {
        setFile(event.target.files[0])
      }
    
    function handleUpload() {
        console.log("File to upload:", typeof(file));
        const formData = new FormData();
        formData.append('file', file);
        request('POST', '/api/fileUpload', formData)
                        .then(
                            (response) => {
                                alert(response.data);
                            }).catch(
                            (error) => {
                                console.error("Error obtaining file:", error);                 
                            }
                        );
    }

    return (
        <div className="container">
            <h1 className="text-center">Unrestricted File Upload</h1>
            <div className="d-flex justify-content-center" style={{ height: '100vh' }}>
                <div className='w-25'>
                    <div className="form-outline mb-4">
                    <input id="file" type="file" onChange={handleFileChange} />
                    </div>
                        <div className="form-outline mb-4">
                            {file && (
                                <section>
                                File details:
                                <ul>
                                    <li>Name: {file.name}</li>
                                    <li>Type: {file.type}</li>
                                    <li>Size: {file.size} bytes</li>
                                </ul>
                                </section>
                            )}
                        </div>
                        <div className="form-outline mb-4">
                            {file && (
                                <button 
                                onClick={handleUpload}>Upload {file.name}</button>
                            )}
                        </div>
                                <b  className="text-center" onClick={()=>setShowTip(true)}>Display tip</b>
                                {showTip && (
                                    <div className="alert alert-info text-center" role="alert">
                                        <p>Try using this to exploit another vulnerability.</p>
                                        <button type="button" className="btn-close" onClick={() => setShowTip(false)}></button>
                                    </div>
                                )}
                        </div>
                
                </div>
        </div>
    );
}