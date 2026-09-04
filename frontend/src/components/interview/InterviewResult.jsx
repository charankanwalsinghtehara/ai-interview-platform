import {
    Trophy,
    BrainCircuit,
    MessageSquare,
    TrendingUp,
    CheckCircle
} from "lucide-react";

import "./Interview.css";


function InterviewResult({
    report
}) {

    if (!report) {

        return null;

    }


    const score =

        report.overall_score ??
        report.interview_score ??
        0;


    const strengths =

        report.strengths || [];


    const improvements =

        report.improvements ||
        report.areas_for_improvement ||
        [];


    return (

        <div className="interview-result">


            {/* RESULT HERO */}

            <div className="result-hero">

                <div className="result-score-circle">

                    <Trophy size={38} />

                    <strong>
                        {score}%
                    </strong>

                </div>


                <div>

                    <h1>
                        Interview Completed! 🎉
                    </h1>

                    <p>
                        Here's your AI-powered
                        interview performance report.
                    </p>

                </div>

            </div>


            {/* RESULT STATS */}

            <div className="result-stats">


                <ResultCard

                    title="Overall Score"

                    value={`${score}%`}

                    icon={BrainCircuit}

                />


                <ResultCard

                    title="Communication"

                    value={
                        report.communication_score
                            ? `${report.communication_score}%`
                            : "--"
                    }

                    icon={MessageSquare}

                />


                <ResultCard

                    title="Technical Skills"

                    value={
                        report.technical_score
                            ? `${report.technical_score}%`
                            : "--"
                    }

                    icon={TrendingUp}

                />

            </div>


            {/* STRENGTHS */}

            <div className="result-section">

                <h2>
                    Your Strengths 💪
                </h2>


                {
                    strengths.length > 0

                        ? strengths.map(

                            (
                                strength,
                                index
                            ) => (

                                <div

                                    key={index}

                                    className="feedback-item"

                                >

                                    <CheckCircle
                                        size={19}
                                    />

                                    {strength}

                                </div>

                            )

                        )

                        : (

                            <p>
                                Detailed strengths will
                                appear after evaluation.
                            </p>

                        )
                }

            </div>


            {/* IMPROVEMENTS */}

            <div className="result-section">

                <h2>
                    Areas for Improvement 🚀
                </h2>


                {
                    improvements.length > 0

                        ? improvements.map(

                            (
                                improvement,
                                index
                            ) => (

                                <div

                                    key={index}

                                    className="
                                        feedback-item
                                        improvement
                                    "

                                >

                                    <TrendingUp
                                        size={19}
                                    />

                                    {improvement}

                                </div>

                            )

                        )

                        : (

                            <p>
                                Detailed improvement
                                suggestions will appear
                                after evaluation.
                            </p>

                        )
                }

            </div>

        </div>

    );

}



function ResultCard({

    title,
    value,
    icon: Icon

}) {

    return (

        <div className="result-card">

            <div className="result-card-icon">

                <Icon size={22} />

            </div>


            <div>

                <p>
                    {title}
                </p>

                <h3>
                    {value}
                </h3>

            </div>

        </div>

    );

}


export default InterviewResult;