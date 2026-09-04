import {
    BriefcaseBusiness,
    TrendingUp,
    CheckCircle,
    AlertCircle
} from "lucide-react";


function RoleMatchCard({

    role,
    index

}) {

    const roleName =
        role.role || "Career Role";


    const readinessScore =
        role.readiness_score ?? 0;


    const matchedRequired =
        role.matched_required_skills || [];


    const missingRequired =
        role.missing_required_skills || [];


    const matchedImportant =
        role.matched_important_skills || [];


    const missingImportant =
        role.missing_important_skills || [];


    return (

        <div className="role-match-card">


            <div className="role-card-top">


                <div className="role-icon">

                    <BriefcaseBusiness
                        size={22}
                    />

                </div>


                <span className="role-rank">

                    #{index + 1}

                </span>

            </div>


            <h3>

                {roleName}

            </h3>


            <div className="role-score">

                <TrendingUp size={16} />

                <span>

                    {readinessScore}% Readiness

                </span>

            </div>


            <div className="progress-bar">

                <div

                    className="progress-fill"

                    style={{

                        width: `${Math.min(
                            Math.max(
                                Number(readinessScore) || 0,
                                0
                            ),
                            100
                        )}%`

                    }}

                />

            </div>


            <div className="role-skill-summary">


                <div className="skill-summary-item matched">

                    <CheckCircle size={16} />

                    <span>

                        {role.total_matched_skills || 0}
                        {" "}Matched

                    </span>

                </div>


                <div className="skill-summary-item missing">

                    <AlertCircle size={16} />

                    <span>

                        {role.total_missing_skills || 0}
                        {" "}Missing

                    </span>

                </div>


            </div>


            {
                matchedRequired.length > 0 && (

                    <div className="role-skills-section">

                        <h4>

                            Matched Required Skills

                        </h4>


                        <div className="role-skills">

                            {
                                matchedRequired.map(
                                    (skill, skillIndex) => (

                                        <span

                                            key={skillIndex}

                                            className="skill-tag matched-tag"

                                        >

                                            <CheckCircle
                                                size={13}
                                            />

                                            {skill}

                                        </span>

                                    )
                                )
                            }

                        </div>

                    </div>

                )
            }


            {
                missingRequired.length > 0 && (

                    <div className="role-skills-section">

                        <h4>

                            Required Skills to Learn

                        </h4>


                        <div className="role-skills">

                            {
                                missingRequired.map(
                                    (skill, skillIndex) => (

                                        <span

                                            key={skillIndex}

                                            className="skill-tag missing-tag"

                                        >

                                            <AlertCircle
                                                size={13}
                                            />

                                            {skill}

                                        </span>

                                    )
                                )
                            }

                        </div>

                    </div>

                )
            }


            {
                missingImportant.length > 0 && (

                    <div className="role-skills-section">

                        <h4>

                            Important Skills to Improve

                        </h4>


                        <div className="role-skills">

                            {
                                missingImportant.map(
                                    (skill, skillIndex) => (

                                        <span

                                            key={skillIndex}

                                            className="skill-tag important-tag"

                                        >

                                            {skill}

                                        </span>

                                    )
                                )
                            }

                        </div>

                    </div>

                )
            }


        </div>

    );

}


export default RoleMatchCard;