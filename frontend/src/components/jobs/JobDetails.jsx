import {
    X,
    CheckCircle,
    AlertCircle,
    BriefcaseBusiness
} from "lucide-react";

import "./Jobs.css";


function JobDetails({

    job,

    onClose

}) {

    if (!job) {

        return null;

    }


    const requiredSkills =
        job.required_skills || [];


    const matchedSkills =
        job.matched_skills || [];


    const missingSkills =
        job.missing_skills || [];


    return (

        <div className="job-modal-overlay">


            <div className="job-modal">


                <button

                    className="modal-close"

                    onClick={onClose}

                >

                    <X size={22} />

                </button>


                <div className="job-modal-header">

                    <div className="job-icon">

                        <BriefcaseBusiness
                            size={28}
                        />

                    </div>


                    <div>

                        <h2>

                            {
                                job.title ??
                                job.job_title
                            }

                        </h2>


                        <p>

                            {job.company}

                        </p>

                    </div>

                </div>


                {/* MATCHED SKILLS */}

                <div className="job-details-section">

                    <h3>
                        Matched Skills
                    </h3>


                    <div className="job-skills">

                        {
                            matchedSkills.length > 0

                                ? matchedSkills.map(

                                    (
                                        skill,
                                        index
                                    ) => (

                                        <span

                                            key={index}

                                            className="matched-skill"

                                        >

                                            <CheckCircle
                                                size={14}
                                            />

                                            {skill}

                                        </span>

                                    )

                                )

                                : (

                                    <p>
                                        Skill matching information
                                        will appear here.
                                    </p>

                                )
                        }

                    </div>

                </div>


                {/* MISSING SKILLS */}

                <div className="job-details-section">

                    <h3>
                        Skills To Improve
                    </h3>


                    <div className="job-skills">

                        {
                            missingSkills.length > 0

                                ? missingSkills.map(

                                    (
                                        skill,
                                        index
                                    ) => (

                                        <span

                                            key={index}

                                            className="missing-skill"

                                        >

                                            <AlertCircle
                                                size={14}
                                            />

                                            {skill}

                                        </span>

                                    )

                                )

                                : (

                                    <p>
                                        Great! No major missing
                                        skills identified.
                                    </p>

                                )
                        }

                    </div>

                </div>


                {/* REQUIRED SKILLS */}

                <div className="job-details-section">

                    <h3>
                        Required Skills
                    </h3>


                    <div className="job-skills">

                        {
                            requiredSkills.map(

                                (
                                    skill,
                                    index
                                ) => (

                                    <span

                                        key={index}

                                        className="required-skill"

                                    >

                                        {skill}

                                    </span>

                                )

                            )
                        }

                    </div>

                </div>

            </div>

        </div>

    );

}


export default JobDetails;