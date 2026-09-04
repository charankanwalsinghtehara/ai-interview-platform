import {
    Target,
    Award,
    TrendingUp
} from "lucide-react";


function CareerHero({

    bestMatch

}) {

    if (!bestMatch) {

        return null;

    }


    const roleName =
        bestMatch.role ||
        bestMatch.name ||
        bestMatch.title ||
        "Career Match";


    const matchScore =
        bestMatch.match_score ??
        bestMatch.score ??
        bestMatch.match_percentage ??
        0;


    return (

        <div className="career-hero">


            <div className="career-hero-icon">

                <Target size={32} />

            </div>


            <div className="career-hero-content">

                <p className="career-label">

                    YOUR BEST CAREER MATCH

                </p>


                <h2>

                    {roleName}

                </h2>


                <p>

                    Based on your resume skills and
                    career profile analysis.

                </p>

            </div>


            <div className="career-score-box">

                <Award size={24} />

                <strong>

                    {matchScore}%

                </strong>

                <span>

                    Match Score

                </span>

            </div>


        </div>

    );

}


export default CareerHero;