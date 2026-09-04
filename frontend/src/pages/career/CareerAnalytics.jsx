import {
    useEffect,
    useState
} from "react";

import {
    Brain,
    Target,
    AlertCircle,
    LoaderCircle
} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";

import CareerHero from "../../components/career/CareerHero";

import RoleMatchCard from "../../components/career/RoleMatchCard";

import SkillGapCard from "../../components/career/SkillGapCard";

import {
    getCareerAnalysis
} from "../../services/careerService";

import "../../components/career/CareerAnalytics.css";


function CareerAnalytics() {


    const [careerData, setCareerData] =
        useState(null);


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");


    useEffect(() => {


        const loadCareerAnalysis =
            async () => {


                try {

                    setLoading(true);

                    setError("");


                    const data =
                        await getCareerAnalysis();


                    setCareerData(data);


                }

                catch (error) {

                    console.error(
                        "Career analytics error:",
                        error
                    );


                    setError(

                        error.response?.data?.error ||

                        error.response?.data?.detail ||

                        "Unable to load career analytics."

                    );

                }

                finally {

                    setLoading(false);

                }

            };


        loadCareerAnalysis();


    }, []);


    const careerAnalysis =
        careerData?.career_analysis || {};


    const bestMatch =
        careerAnalysis.best_match ||
        null;


    const roleMatches =
        careerAnalysis.roles ||
        careerAnalysis.role_matches ||
        careerAnalysis.all_roles ||
        careerAnalysis.matches ||
        [];


    const recommendations =
        careerData?.skill_gap_recommendations ||
        [];


    return (

        <div className="page-container career-page">


            <PageHeader

                title="Career Analytics"

                subtitle="Discover your strongest career path, role compatibility and skills to improve."

            />


            {
                loading ? (

                    <div className="career-loading">

                        <LoaderCircle
                            size={38}
                            className="loading-spinner"
                        />

                        <h3>

                            Analyzing your career profile...

                        </h3>

                        <p>

                            Matching your skills with career opportunities.

                        </p>

                    </div>

                ) : error ? (

                    <div className="career-error">

                        <AlertCircle
                            size={40}
                        />

                        <h2>

                            Career Analysis Unavailable

                        </h2>

                        <p>

                            {error}

                        </p>

                    </div>

                ) : (

                    <>


                        {
                            bestMatch && (

                                <CareerHero

                                    bestMatch={
                                        bestMatch
                                    }

                                />

                            )
                        }


                        <div className="career-section">

                            <div className="section-title">

                                <div>

                                    <h2>

                                        Career Role Matches

                                    </h2>


                                    <p>

                                        Roles ranked according to your current skills.

                                    </p>

                                </div>


                                <Brain size={26} />

                            </div>


                            {
                                Array.isArray(roleMatches) &&
                                roleMatches.length > 0

                                    ? (

                                        <div className="role-matches-grid">

                                            {
                                                roleMatches.map(
                                                    (
                                                        role,
                                                        index
                                                    ) => (

                                                        <RoleMatchCard

                                                            key={
                                                                role.role ||
                                                                role.name ||
                                                                role.title ||
                                                                index
                                                            }

                                                            role={role}

                                                            index={index}

                                                        />

                                                    )
                                                )
                                            }

                                        </div>

                                    )

                                    : (

                                        <div className="career-empty">

                                            <Target
                                                size={38}
                                            />

                                            <h3>

                                                No Role Matches Yet

                                            </h3>


                                            <p>

                                                Complete your resume analysis to generate career role matches.

                                            </p>

                                        </div>

                                    )
                            }

                        </div>


                        <SkillGapCard

                            recommendations={
                                recommendations
                            }

                        />


                    </>

                )
            }


        </div>

    );

}


export default CareerAnalytics;