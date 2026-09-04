import {
    BriefcaseBusiness,
    MapPin,
    TrendingUp,
    CheckCircle,
    ArrowRight
} from "lucide-react";

import "./Jobs.css";


function JobCard({

    job,

    onViewDetails

}) {

    const matchScore =
        job.match_score ??
        job.match_percentage ??
        0;


    return (

        <div className="job-card">


            <div className="job-card-top">


                <div className="job-icon">

                    <BriefcaseBusiness
                        size={25}
                    />

                </div>


                <div className="match-badge">

                    {matchScore}% Match

                </div>

            </div>


            <h2>

                {
                    job.title ??
                    job.job_title ??
                    "Recommended Role"
                }

            </h2>


            <p className="job-company">

                {
                    job.company ??
                    "Recommended Opportunity"
                }

            </p>


            <div className="job-location">

                <MapPin size={16} />

                {
                    job.location ??
                    "Location not specified"
                }

            </div>


            <div className="job-match-info">

                <TrendingUp size={17} />

                Strong match based on your
                resume and interview performance.

            </div>


            <button

                className="job-details-button"

                onClick={() =>
                    onViewDetails(job)
                }

            >

                View Details

                <ArrowRight size={17} />

            </button>


        </div>

    );

}


export default JobCard;