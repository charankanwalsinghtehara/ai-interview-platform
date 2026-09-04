import {
    CheckCircle,
    AlertCircle,
    Lightbulb
} from "lucide-react";


function SkillGapCard({

    recommendations

}) {


    const recommendationList =
        Array.isArray(recommendations)
            ? recommendations
            : [];


    return (

        <div className="skill-gap-card">


            <div className="skill-gap-header">

                <div className="skill-gap-icon">

                    <Lightbulb size={25} />

                </div>


                <div>

                    <h2>

                        Skill Gap Recommendations

                    </h2>


                    <p>

                        Improve these areas to strengthen
                        your career readiness.

                    </p>

                </div>

            </div>


            {
                recommendationList.length > 0

                    ? (

                        <div className="recommendations-list">

                            {
                                recommendationList.map(
                                    (
                                        item,
                                        index
                                    ) => {

                                        const title =
                                            typeof item === "string"
                                                ? item
                                                : (
                                                    item.skill ||
                                                    item.title ||
                                                    item.name ||
                                                    item.recommendation ||
                                                    "Career Recommendation"
                                                );


                                        const description =
                                            typeof item === "object"
                                                ? (
                                                    item.description ||
                                                    item.message ||
                                                    item.action ||
                                                    ""
                                                )
                                                : "";


                                        return (

                                            <div

                                                className="recommendation-item"

                                                key={index}

                                            >

                                                <AlertCircle
                                                    size={19}
                                                />


                                                <div>

                                                    <h4>

                                                        {title}

                                                    </h4>


                                                    {
                                                        description && (

                                                            <p>

                                                                {
                                                                    description
                                                                }

                                                            </p>

                                                        )
                                                    }

                                                </div>

                                            </div>

                                        );

                                    }
                                )
                            }

                        </div>

                    )

                    : (

                        <div className="career-empty">

                            <CheckCircle
                                size={35}
                            />

                            <p>

                                No major skill gaps identified yet.

                            </p>

                        </div>

                    )
            }


        </div>

    );

}


export default SkillGapCard;