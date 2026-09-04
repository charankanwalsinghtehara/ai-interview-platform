import {
    Code2,
    TrendingUp
} from "lucide-react";

import "./Reports.css";


function SkillsReport({

    skills = [],

    categorizedSkills = {}

}) {

    return (

        <div className="skills-report">


            <div className="report-section-header">

                <div>

                    <h2>
                        Skills Intelligence
                    </h2>

                    <p>
                        Skills identified from your resume.
                    </p>

                </div>


                <Code2 size={25} />

            </div>


            {/* ALL SKILLS */}

            <div className="report-skills">

                {
                    skills.length > 0

                        ? skills.map(

                            (skill, index) => (

                                <span

                                    key={index}

                                    className="report-skill-tag"

                                >

                                    {skill}

                                </span>

                            )

                        )

                        : (

                            <p className="no-data">

                                Upload a resume to see your skills.

                            </p>

                        )
                }

            </div>


            {/* SKILL CATEGORIES */}

            {
                Object.keys(categorizedSkills).length > 0 && (

                    <div className="skill-categories">

                        {
                            Object.entries(
                                categorizedSkills
                            ).map(

                                ([
                                    category,
                                    categorySkills
                                ]) => (

                                    <div

                                        key={category}

                                        className="skill-category-item"

                                    >

                                        <div className="category-title">

                                            <TrendingUp
                                                size={18}
                                            />

                                            <strong>
                                                {category}
                                            </strong>

                                        </div>


                                        <div className="report-skills">

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

                                                                className="report-skill-tag"

                                                            >

                                                                {skill}

                                                            </span>

                                                        )

                                                    )

                                                    : null
                                            }

                                        </div>

                                    </div>

                                )

                            )
                        }

                    </div>

                )
            }

        </div>

    );

}


export default SkillsReport;