import {
    BrainCircuit,
    Code2,
    GraduationCap,
    BriefcaseBusiness,
    FolderKanban
} from "lucide-react";

import "./Resume.css";


function ResumeAnalysis({
    analysis
}) {

    if (!analysis) {

        return null;

    }


    const skills =
        analysis.skills || [];


    const categorizedSkills =
        analysis.categorized_skills || {};


    return (

        <div className="resume-analysis">


            {/* OVERALL SCORE */}

            <div className="overall-score-card">

                <div>

                    <p>
                        Overall Resume Score
                    </p>

                    <h1>

                        {
                            analysis.overall_resume_score ??
                            0
                        }%

                    </h1>

                    <span>
                        Based on your skills, education,
                        experience and projects.
                    </span>

                </div>


                <div className="score-icon">

                    <BrainCircuit size={45} />

                </div>

            </div>


            {/* SCORE CARDS */}

            <div className="resume-score-grid">


                <ScoreCard

                    title="Skills"

                    score={
                        analysis.skills_score
                    }

                    icon={Code2}

                />


                <ScoreCard

                    title="Education"

                    score={
                        analysis.education_score
                    }

                    icon={GraduationCap}

                />


                <ScoreCard

                    title="Experience"

                    score={
                        analysis.experience_score
                    }

                    icon={BriefcaseBusiness}

                />


                <ScoreCard

                    title="Projects"

                    score={
                        analysis.project_score
                    }

                    icon={FolderKanban}

                />

            </div>


            {/* SKILLS */}

            <div className="analysis-section">

                <h2>
                    Extracted Skills
                </h2>


                <div className="skills-container">

                    {
                        skills.length > 0

                            ? skills.map(

                                (skill, index) => (

                                    <span

                                        key={index}

                                        className="skill-tag"

                                    >

                                        {skill}

                                    </span>

                                )

                            )

                            : (

                                <p>
                                    No skills found yet.
                                </p>

                            )
                    }

                </div>

            </div>


            {/* CATEGORIZED SKILLS */}

            <div className="analysis-section">

                <h2>
                    Skills by Category
                </h2>


                <div className="category-grid">

                    {
                        Object.entries(
                            categorizedSkills
                        ).map(

                            ([category, categorySkills]) => (

                                <div

                                    key={category}

                                    className="category-card"

                                >

                                    <h3>

                                        {category}

                                    </h3>


                                    <div className="skills-container">

                                        {
                                            Array.isArray(
                                                categorySkills
                                            )

                                                ? categorySkills.map(
                                                    (
                                                        skill,
                                                        index
                                                    ) => (

                                                        <span

                                                            key={index}

                                                            className="skill-tag"

                                                        >

                                                            {skill}

                                                        </span>

                                                    )
                                                )

                                                : (
                                                    <span>
                                                        No data
                                                    </span>
                                                )
                                        }

                                    </div>

                                </div>

                            )

                        )
                    }

                </div>

            </div>


        </div>

    );

}



function ScoreCard({

    title,
    score,
    icon: Icon

}) {

    return (

        <div className="resume-score-card">

            <div className="resume-score-icon">

                <Icon size={22} />

            </div>


            <div>

                <p>
                    {title}
                </p>

                <h3>
                    {score ?? 0}%
                </h3>

            </div>

        </div>

    );

}


export default ResumeAnalysis;