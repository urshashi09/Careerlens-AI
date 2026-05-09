import React, { useState } from 'react'
import "../styles/home.scss"

const Home = () => {
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName("");
        }
    };
    return (
        <main className='home'>
            <div className="background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>
            
            <div className="interview-input-group glass-container">
                <div className="title-section">
                    <h1>AI Interview Prep</h1>
                    <p>Enter your details to generate a customized interview report.</p>
                </div>

                <div className="content-section">
                    <div className='left'>
                        <div className="input-group full-height">
                            <label htmlFor="jobDescription">Job Description</label>
                            <textarea name="jobDescription" id="jobDescription" placeholder='Enter the job description...'></textarea>
                        </div>
                    </div>
                    <div className='right'>
                        <div className='input-group full-height'>
                            <label htmlFor="selfDescription">Self Description</label>
                            <textarea name="selfDescription" id='selfDescription' placeholder='Describe yourself...'></textarea>
                        </div>
                        <div className='input-group upload-group'>
                            <label className={`file-label ${fileName ? 'has-file' : ''}`} htmlFor="resume">
                                {fileName ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload-cloud"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
                                )}
                                <span>{fileName ? fileName : "Upload Resume PDF"}</span>
                            </label>
                            <input hidden type="file" name='resume' id='resume' accept='.pdf' onChange={handleFileChange} />
                        </div>
                    </div>
                </div>
                
                <div className="action-section">
                    <button className='button primary-button'>Generate Report</button>
                </div>
            </div>
        </main>
    )
}

export default Home