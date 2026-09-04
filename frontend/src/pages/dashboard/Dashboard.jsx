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


import {
    getSubscriptionStatus,
    getSubscriptionUsage
} from "../../services/paymentService";

function Dashboard() {


const navigate = useNavigate();


const [loading, setLoading] =
    useState(true);


const [error, setError] =
    useState("");


const [dashboardData, setDashboardData] =
    useState(null);

    const [subscriptionData, setSubscriptionData] =
    useState(null);

const [usageData, setUsageData] =
    useState(null);


useEffect(() => {

    const loadDashboard = async () => {

        try {

            setLoading(true);

            setError("");


            const data =
                await getDashboardData();


            setDashboardData(data);

            const subscription =
    await getSubscriptionStatus();

setSubscriptionData(subscription);

            const usage =
    await getSubscriptionUsage();

setUsageData(usage);

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
   SUBSCRIPTION DATA
========================= */

const hasSubscription =
    subscriptionData?.has_subscription || false;


const subscription =
    subscriptionData?.subscription || null;


const subscriptionPlan =
    subscription?.plan || "FREE";


const subscriptionStatus =
    subscription?.status || "INACTIVE";


const paymentMethod =
    subscription?.payment_method || "--";


const expiryDate =
    subscription?.expires_at
        ? new Date(
            subscription.expires_at
        ).toLocaleDateString()
        : "--";


const daysRemaining =
    subscription?.expires_at
        ? Math.max(

            0,

            Math.ceil(

                (
                    new Date(subscription.expires_at) -
                    new Date()
                ) / (1000 * 60 * 60 * 24)

            )

        )
        : 0;
const resumeUsage =
    usageData?.resume_analyses || {};


const interviewUsage =
    usageData?.interviews || {};


const resumeUsed =
    resumeUsage.used ?? 0;


const resumeLimit =
    resumeUsage.limit ?? 0;


const resumeRemaining =
    resumeUsage.remaining ?? 0;


const interviewUsed =
    interviewUsage.used ?? 0;


const interviewLimit =
    interviewUsage.limit ?? 0;


const interviewRemaining =
    interviewUsage.remaining ?? 0;
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
{/* SUBSCRIPTION */}
{/* ========================= */}

<div className="dashboard-card subscription-card">

    <div className="dashboard-card-header">

        <h3>
            Subscription
        </h3>

    </div>


    {

        hasSubscription ? (

            <div className="subscription-details">


                <div className="subscription-item">

                    <span>
                        Current Plan
                    </span>

                    <strong>
                        {subscriptionPlan}
                    </strong>

                </div>


                <div className="subscription-item">

                    <span>
                        Status
                    </span>

                    <strong className="subscription-active">

                        {subscriptionStatus}

                    </strong>

                </div>


                <div className="subscription-item">

                    <span>
                        Payment Method
                    </span>

                    <strong>
                        {paymentMethod}
                    </strong>

                </div>


                <div className="subscription-item">

                    <span>
                        Expires On
                    </span>

                    <strong>
                        {expiryDate}
                    </strong>

                </div>


                <div className="subscription-item">

                    <span>
                        Days Remaining
                    </span>

                    <strong>
                        {daysRemaining} days
                    </strong>

                </div>


            </div>

        ) : (

            <div className="no-subscription">

                <p>
                    You are currently using the Free plan.
                </p>


                <button
                    className="subscription-button"
                    onClick={() =>
                        navigate("/pricing")
                    }
                >

                    Upgrade Plan

                </button>

            </div>

        )

    }

</div>



            {/* ========================= */}
{/* MONTHLY USAGE */}
{/* ========================= */}

<div className="dashboard-card usage-card">

    <div className="dashboard-card-header">

        <h3>
            Monthly Usage
        </h3>

        <span className="usage-plan">
            {usageData?.plan || "FREE"} Plan
        </span>

    </div>


    {/* RESUME USAGE */}

    <div className="usage-section">

        <div className="usage-title">

            <div>

                <strong>
                    Resume Analyses
                </strong>

                <span>
                    {resumeUsed} / {resumeLimit} used
                </span>

            </div>

            <strong>
                {
                    resumeRemaining === "Unlimited"
                        ? "Unlimited"
                        : `${resumeRemaining} left`
                }
            </strong>

        </div>


        {
            resumeLimit !== "Unlimited" && (

                <div className="usage-progress">

                    <div

                        className="usage-progress-fill"

                        style={{

                            width: `${Math.min(
                                100,
                                (resumeUsed / resumeLimit) * 100
                            )}%`

                        }}

                    />

                </div>

            )

        }

    </div>


    {/* INTERVIEW USAGE */}

    <div className="usage-section">

        <div className="usage-title">

            <div>

                <strong>
                    AI Interviews
                </strong>

                <span>
                    {interviewUsed} / {interviewLimit} used
                </span>

            </div>

            <strong>
                {
                    interviewRemaining === "Unlimited"
                        ? "Unlimited"
                        : `${interviewRemaining} left`
                }
            </strong>

        </div>


        {
            interviewLimit !== "Unlimited" && (

                <div className="usage-progress">

                    <div

                        className="usage-progress-fill"

                        style={{

                            width: `${Math.min(
                                100,
                                (interviewUsed / interviewLimit) * 100
                            )}%`

                        }}

                    />

                </div>

            )

        }

    </div>


    {/* UPGRADE BUTTON */}

    {
        usageData?.plan !== "PREMIUM" && (

            <button

                className="usage-upgrade-button"

                onClick={() =>
                    navigate("/pricing")
                }

            >

                Upgrade Your Plan

            </button>

        )

    }

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
