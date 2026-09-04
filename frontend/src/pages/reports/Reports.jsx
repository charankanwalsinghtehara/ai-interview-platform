import {
    useEffect,
    useState
} from "react";

import PageHeader from "../../components/common/PageHeader";

import OverallReport from "../../components/reports/OverallReport";

import PerformanceChart from "../../components/reports/PerformanceChart";

import SkillsReport from "../../components/reports/SkillsReport";

import PowerBIDashboard from "../../components/reports/PowerBIDashboard";

import {

    getCombinedReport,

    getResumeAnalytics,

    getInterviewAnalytics

} from "../../services/reportService";

import "../../components/reports/Reports.css";


function Reports() {

    const [loading, setLoading] =
        useState(true);


    const [data, setData] =
        useState({

            report: null,

            resume: null,

            interview: null

        });


    useEffect(() => {

        const loadReports = async () => {

            try {

                const [

                    report,

                    resume,

                    interview

                ] = await Promise.allSettled([

                    getCombinedReport(),

                    getResumeAnalytics(),

                    getInterviewAnalytics()

                ]);


                setData({

                    report:

                        report.status === "fulfilled"
                            ? report.value
                            : null,


                    resume:

                        resume.status === "fulfilled"
                            ? resume.value
                            : null,


                    interview:

                        interview.status === "fulfilled"
                            ? interview.value
                            : null

                });

            }

            catch (error) {

                console.error(
                    "Reports error:",
                    error
                );

            }

            finally {

                setLoading(false);

            }

        };


        loadReports();

    }, []);


    const resumeScore =

        data.resume?.overall_resume_score ?? 0;


    const interviewScore =

        data.interview?.overall_score ??
        data.interview?.interview_score ??
        0;


    const overallScore =

        data.report?.overall_score ??
        (
            (resumeScore + interviewScore) / 2
        );


    return (

        <div className="page-container">

            <PageHeader

                title="Career Intelligence Report"

                subtitle="Analyze your resume, interview performance and overall career readiness."

            />


            <OverallReport

                resumeScore={resumeScore}

                interviewScore={interviewScore}

                overallScore={overallScore}

            />


            <PerformanceChart

                resumeScore={resumeScore}

                interviewScore={interviewScore}

                overallScore={overallScore}

            />


            <SkillsReport

                skills={
                    data.resume?.skills || []
                }

                categorizedSkills={
                    data.resume?.categorized_skills || {}
                }

            />


            <PowerBIDashboard />


            {
                loading && (

                    <p>
                        Loading your career analytics...
                    </p>

                )
            }

        </div>

    );

}


export default Reports;