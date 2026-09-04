import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";

import ResumeUpload from "../../components/resume/ResumeUpload";

import ResumeAnalysis from "../../components/resume/ResumeAnalysis";

import {
    analyzeActiveResume
} from "../../services/intelligenceService";


function Resume() {

    const [analysis, setAnalysis] =
        useState(null);

    const [analyzing, setAnalyzing] =
        useState(false);

    const [analysisError, setAnalysisError] =
        useState("");


    const handleUploadSuccess = async () => {

        setAnalyzing(true);

        setAnalysisError("");


        try {

            const data =
                await analyzeActiveResume();


            setAnalysis(
                data.analysis
            );

        }

        catch (error) {

            console.error(
                "Resume analysis error:",
                error
            );


            setAnalysisError(

                error.response?.data?.error ||

                error.response?.data?.detail ||

                "Resume was uploaded, but analysis failed."

            );

        }

        finally {

            setAnalyzing(false);

        }

    };


    return (

        <div className="page-container">

            <PageHeader

                title="Resume Analysis"

                subtitle="Upload your resume and discover your professional strengths, skills and career insights."

            />


            <ResumeUpload

                onUploadSuccess={
                    handleUploadSuccess
                }

            />


            {
                analyzing && (

                    <div className="analysis-loading">

                        Analyzing your resume...
                        Please wait.

                    </div>

                )
            }


            {
                analysisError && (

                    <div className="resume-error">

                        {analysisError}

                    </div>

                )
            }


            <ResumeAnalysis

                analysis={analysis}

            />

        </div>

    );

}


export default Resume;