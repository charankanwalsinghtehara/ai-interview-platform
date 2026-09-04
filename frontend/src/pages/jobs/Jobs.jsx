import {
    useEffect,
    useState
} from "react";

import {
    BriefcaseBusiness
} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";

import JobCard from "../../components/jobs/JobCard";

import JobDetails from "../../components/jobs/JobDetails";

import {
    getJobRecommendations
} from "../../services/jobService";

import "../../components/jobs/Jobs.css";


function Jobs() {

    const [jobs, setJobs] =
        useState([]);


    const [selectedJob, setSelectedJob] =
        useState(null);


    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        const loadJobs = async () => {

            try {

                const data =
                    await getJobRecommendations();


                setJobs(

    Array.isArray(data)

        ? data

        : data.recommendations || []

);
            }

            catch (error) {

                console.error(
                    "Job recommendation error:",
                    error
                );

            }

            finally {

                setLoading(false);

            }

        };


        loadJobs();

    }, []);


    return (

        <div className="page-container">

            <PageHeader

                title="Recommended Jobs"

                subtitle="Career opportunities matched with your skills, resume analysis and interview performance."

            />


            {
                loading ? (

                    <p>
                        Finding the best jobs for you...
                    </p>

                ) : jobs.length > 0 ? (

                    <div className="jobs-grid">

                        {
                            jobs.map(
                                (job) => (

                                    <JobCard

                                        key={job.id}

                                        job={job}

                                        onViewDetails={
                                            setSelectedJob
                                        }

                                    />

                                )
                            )
                        }

                    </div>

                ) : (

                    <div className="jobs-empty">

                        <BriefcaseBusiness
                            size={50}
                        />

                        <h2>
                            No Recommendations Yet
                        </h2>

                        <p>
                            Complete your resume analysis
                            and AI interview to receive
                            personalized job recommendations.
                        </p>

                    </div>

                )
            }


            <JobDetails

                job={selectedJob}

                onClose={() =>
                    setSelectedJob(null)
                }

            />

        </div>

    );

}


export default Jobs;