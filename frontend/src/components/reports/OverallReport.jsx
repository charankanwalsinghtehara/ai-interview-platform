import {
    BrainCircuit,
    FileText,
    MessageSquare,
    Award
} from "lucide-react";

import "./Reports.css";


function OverallReport({

    resumeScore,

    interviewScore,

    overallScore

}) {

    return (

        <div className="overall-report-grid">


            <ReportCard

                title="Resume Score"

                value={`${resumeScore}%`}

                description="
                    Based on skills, education,
                    projects and experience.
                "

                icon={FileText}

            />


            <ReportCard

                title="Interview Score"

                value={`${interviewScore}%`}

                description="
                    Based on your interview
                    performance and answers.
                "

                icon={MessageSquare}

            />


            <ReportCard

                title="Overall Candidate Score"

                value={`${overallScore}%`}

                description="
                    Combined career intelligence score.
                "

                icon={BrainCircuit}

            />


            <ReportCard

                title="Performance Level"

                value={
                    overallScore >= 80
                        ? "Excellent"
                        : overallScore >= 60
                            ? "Good"
                            : "Improving"
                }

                description="
                    Your current performance level.
                "

                icon={Award}

            />

        </div>

    );

}



function ReportCard({

    title,
    value,
    description,
    icon: Icon

}) {

    return (

        <div className="report-stat-card">

            <div className="report-icon">

                <Icon size={23} />

            </div>


            <p>
                {title}
            </p>


            <h2>
                {value}
            </h2>


            <span>
                {description}
            </span>

        </div>

    );

}


export default OverallReport;