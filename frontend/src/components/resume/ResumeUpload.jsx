import { useState } from "react";

import {
    Upload,
    FileText,
    X,
    CheckCircle
} from "lucide-react";

import { uploadResume } from "../../services/resumeService";

import "./Resume.css";


function ResumeUpload({ onUploadSuccess }) {

    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleFileChange = (event) => {

        const file = event.target.files[0];

        if (!file) {
            return;
        }

        if (
            file.type !== "application/pdf" &&
            !file.name.toLowerCase().endsWith(".pdf")
        ) {
            setError("Please upload a PDF file.");
            setSelectedFile(null);
            return;
        }

        setSelectedFile(file);
        setError("");
        setSuccess("");
    };


    const removeFile = () => {

        setSelectedFile(null);
        setError("");
        setSuccess("");
    };


    const handleUpload = async () => {

        if (!selectedFile) {
            setError("Please select a resume first.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {

            const data = await uploadResume(selectedFile);

            setSuccess("Resume uploaded successfully!");

            if (onUploadSuccess) {
                onUploadSuccess(data);
            }

            setSelectedFile(null);

        } catch (err) {

            console.error("Resume upload error:", err);

            const responseData = err.response?.data;

            if (responseData?.file) {

                setError(
                    Array.isArray(responseData.file)
                        ? responseData.file[0]
                        : responseData.file
                );

            } else if (responseData?.detail) {

                setError(responseData.detail);

            } else {

                setError(
                    "Resume upload failed. Please try again."
                );
            }

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="resume-upload-card">

            <div className="upload-icon">
                <Upload size={30} />
            </div>


            <h2>Upload Your Resume</h2>

            <p>
                Upload your resume and let our
                data-driven analysis system identify
                your skills and professional strengths.
            </p>


            <label className="upload-area">

                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    hidden
                />


                {selectedFile ? (

                    <div className="selected-file">

                        <FileText size={24} />

                        <div className="file-info">

                            <strong>
                                {selectedFile.name}
                            </strong>

                            <span>
                                {(selectedFile.size / 1024).toFixed(1)} KB
                            </span>

                        </div>


                        <button
                            type="button"
                            onClick={(event) => {

                                event.preventDefault();
                                removeFile();

                            }}
                        >
                            <X size={18} />
                        </button>

                    </div>

                ) : (

                    <>

                        <Upload size={32} />

                        <strong>
                            Click to upload resume
                        </strong>

                        <span>
                            PDF format supported
                        </span>

                    </>

                )}

            </label>


            {error && (

                <div className="resume-error">
                    {error}
                </div>

            )}


            {success && (

                <div className="resume-success">
                    {success}
                </div>

            )}


            <button
                className="analyze-button"
                onClick={handleUpload}
                disabled={loading || !selectedFile}
            >

                {loading ? (

                    "Uploading Resume..."

                ) : (

                    <>

                        <CheckCircle size={19} />

                        Upload Resume

                    </>

                )}

            </button>

        </div>

    );
}


export default ResumeUpload;