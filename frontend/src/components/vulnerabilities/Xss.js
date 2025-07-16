import  { useState, useRef, useEffect} from 'react';


export default function Xss(){
    
    const [inputValue, setInputValue] = useState('');

    const [outputValue, setOutputValue] = useState('');

    const [showTip, setShowTip] = useState(false);

    return (
        <div className="container">
            <h1 className="text-center">XSS Vulnerability Example</h1>
            <div className="d-flex justify-content-center" style={{ height: '100vh' }}>
                <form className='w-25'>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="inputField"><b>Input Field</b></label>
                        <input type="text" id="inputField" name="inputValue" className="form-control col-md-6" onChange={(e) => setInputValue(e.target.value)} />
                        <button type="button" className="btn btn-primary mt-2" onClick={() => setOutputValue(inputValue)}>Submit</button>
                    </div>
                    <div className="form-outline mb-4">
                        <p className="form-label" htmlFor="outputField"><b>Output Field</b></p>
                            {outputValue !== '' ?
                            <div id="outputField"  style={{minHeight: '100%'}}className="form-control col-md-6">
                                <div dangerouslySetInnerHTML={{ __html: outputValue }} />
                            </div>
                            :null}
                    </div>
                    <b  className="text-center" onClick={()=>setShowTip(true)}>Display tip</b>
                    {showTip && (
                        <div className="alert alert-info text-center" role="alert">
                            <p>To test the XSS vulnerability, try using JavaScript events</p>
                            <button type="button" className="btn-close" onClick={() => setShowTip(false)}></button>
                        </div>
                    )}
                </form>
                
            </div>
        </div>
    );
}