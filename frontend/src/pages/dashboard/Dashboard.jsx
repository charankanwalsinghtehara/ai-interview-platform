import {
useEffect,
useState
} from "react";

import {
FileText,
MessageSquare,
BrainCircuit,
BriefcaseBusiness,
Upload,
ArrowRight
} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";

import StatCard from "../../components/dashboard/StatCard";

import {
getDashboardData
} from "../../services/dashboardService";

import "../../components/dashboard/Dashboard.css";

import {
useNavigate
} from "react-router-dom";

function Dashboard() {


const navigate = useNavigate();


const [loading, setLoading] =
    useState(true);


const [error, setError] =
    useState("");


const [dashboardData, setDashboardData] =
    useState(null);


useEffect(() => {

    const loadDashboard = async () => {

        try {

            setLoading(true);

            setError("");


            const data =
                await getDashboardData();


            setDashboardData(data);

        }

        catch (error) {

            console.error(
                "Dashboard error:",
                error
            );


            setError(

                error.response?.data?.error ||

                error.response?.data?.detail ||

                "Unable to load dashboard data."

            );

        }

        finally {

            setLoading(false);

        }

    };


    loadDashboard();

}, []);


const analytics =
    dashboardData?.analytics || {};


/* =========================
   RESUME ANALYTICS
========================= */

const resumeScore =
    analytics.resume_score ?? "--";


const readiness =
    analytics.readiness ?? "Not Available";


const totalSkills =
    analytics.total_skills ?? 0;


const totalProjects =
    analytics.total_projects ?? 0;


const strengths =
    analytics.strengths || [];


const weaknesses =
    analytics.weaknesses || [];


const developingAreas =
    analytics.developing_areas || [];


const categoryScores =
    analytics.category_scores || {};


/* =========================
   FUTURE MODULE DATA
========================= */

const interviewScore = "--";

const overallScore = "--";

const jobMatches = 0;


return (

    <div className="page-container">

        <PageHeader

            title="Dashboard"

            subtitle="Welcome back! Track your career intelligence and performance."

        />


        {
            error && (

                <div className="resume-error">

                    {error}

                </div>

            )
        }


        {/* ========================= */}
        {/* STATISTICS */}
        {/* ========================= */}

        <div className="dashboard-stats">


            <StatCard

                title="Resume Score"

                value={
                    resumeScore !== "--"
                        ? `${resumeScore}%`
                        : "--"
                }

                subtitle={`Career Readiness: ${readiness}`}

                icon={FileText}

                loading={loading}

            />


            <StatCard

                title="Total Skills"

                value={totalSkills}

                subtitle="Skills extracted from your resume"

                icon={BrainCircuit}

                loading={loading}

            />


            <StatCard

                title="Projects"

                value={totalProjects}

                subtitle="Projects found in your resume"

                icon={FileText}

                loading={loading}

            />


            <StatCard

                title="Job Matches"

                value={jobMatches}

                subtitle="Job recommendations coming soon"

                icon={BriefcaseBusiness}

                loading={loading}

            />


        </div>


        {/* ========================= */}
        {/* MAIN DASHBOARD */}
        {/* ========================= */}

        <div className="dashboard-grid">


            {/* PERFORMANCE */}

            <div className="dashboard-card">

                <div className="dashboard-card-header">

                    <h3>
                        Resume Performance
                    </h3>

                </div>


                <div className="performance-list">


                    {/* Resume Score */}

                    <div className="performance-item">

                        <div className="performance-info">

                            <span>
                                Overall Resume Score
                            </span>

                            <strong>

                                {
                                    resumeScore !== "--"
                                        ? `${resumeScore}%`
                                        : "--"
                                }

                            </strong>

                        </div>


                        <div className="progress-bar">

                            <div

                                className="progress-fill"

                                style={{

                                    width:
                                        resumeScore !== "--"
                                            ? `${resumeScore}%`
                                            : "0%"

                                }}

                            />

                        </div>

                    </div>


                    {/* Category Scores */}

                    {
                        Object.entries(
                            categoryScores
                        ).map(

                            ([category, score]) => (

                                <div

                                    className="performance-item"

                                    key={category}

                                >

                                    <div className="performance-info">

                                        <span>

                                            {
                                                category
                                                    .replace(
                                                        /_/g,
                                                        " "
                                                    )
                                            }

                                        </span>


                                        <strong>

                                            {score}%

                                        </strong>

                                    </div>


                                    <div className="progress-bar">

                                        <div

                                            className="progress-fill"

                                            style={{

                                                width:
                                                    `${score}%`

                                            }}

                                        />

                                    </div>

                                </div>

                            )

                        )
                    }


                </div>

            </div>


            {/* QUICK ACTIONS */}

            <div className="dashboard-card">

                <div className="dashboard-card-header">

                    <h3>
                        Quick Actions
                    </h3>

                </div>


                <div className="quick-actions">


                    <button

                        className="quick-action"

                        onClick={() =>
                            navigate("/resume")
                        }

                    >

                        <div className="quick-action-icon">

                            <Upload size={20} />

                        </div>


                        <div>

                            <strong>
                                Upload Resume
                            </strong>

                            <span>
                                Analyze your skills
                            </span>

                        </div>


                        <ArrowRight size={18} />

                    </button>


                    <button

                        className="quick-action"

                        onClick={() =>
                            navigate("/interview")
                        }

                    >

                        <div className="quick-action-icon">

                            <MessageSquare size={20} />

                        </div>


                        <div>

                            <strong>
                                Start Interview
                            </strong>

                            <span>
                                Test your knowledge
                            </span>

                        </div>


                        <ArrowRight size={18} />

                    </button>


                    <button

                        className="quick-action"

                        onClick={() =>
                            navigate("/jobs")
                        }

                    >

                        <div className="quick-action-icon">

                            <BriefcaseBusiness size={20} />

                        </div>


                        <div>

                            <strong>
                                View Job Matches
                            </strong>

                            <span>
                                Explore your opportunities
                            </span>

                        </div>


                        <ArrowRight size={18} />

                    </button>


                </div>

            </div>


            {/* ========================= */}
            {/* CAREER INSIGHTS */}
            {/* ========================= */}

            <div className="dashboard-card">

                <div className="dashboard-card-header">

                    <h3>
                        Career Insights
                    </h3>

                </div>


                <div className="performance-list">


                    <div className="performance-item">

                        <div className="performance-info">

                            <span>
                                Strengths
                            </span>

                            <strong>

                                {strengths.length}

                            </strong>

                        </div>


                        <p>

                            {
                                strengths.length > 0
                                    ? strengths.join(", ")
                                    : "No strengths identified yet."
                            }

                        </p>

                    </div>


                    <div className="performance-item">

                        <div className="performance-info">

                            <span>
                                Developing Areas
                            </span>

                            <strong>

                                {developingAreas.length}

                            </strong>

                        </div>


                        <p>

                            {
                                developingAreas.length > 0
                                    ? developingAreas.join(", ")
                                    : "No developing areas identified."
                            }

                        </p>

                    </div>


                    <div className="performance-item">

                        <div className="performance-info">

                            <span>
                                Areas to Improve
                            </span>

                            <strong>

                                {weaknesses.length}

                            </strong>

                        </div>


                        <p>

                            {
                                weaknesses.length > 0
                                    ? weaknesses.join(", ")
                                    : "No major weaknesses identified."
                            }

                        </p>

                    </div>


                </div>

            </div>


        </div>

    </div>

);


}

export default Dashboard;
