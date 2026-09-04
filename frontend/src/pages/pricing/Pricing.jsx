import {
Check,
Zap,
Crown,
Rocket
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Pricing() {


const navigate = useNavigate();


const plans = [

    {
        name: "Free",

        price: "₹0",

        description:
            "Get started with basic interview practice.",

        icon: Zap,

        features: [

            "Basic interview practice",

            "Limited AI interviews",

            "Basic performance reports",

            "Resume upload"

        ],

        button: "Current Plan",

        popular: false

    },


    {
        name: "Pro",

        price: "₹499",

        description:
            "Unlock advanced features and insights.",

        icon: Crown,

        features: [

            "Unlimited AI interviews",

            "Advanced interview reports",

            "Career analytics",

            "Skill insights",

            "Job recommendations",

            "Priority features"

        ],

        button: "Choose Pro",

        popular: true

    },


    {
        name: "Premium",

        price: "₹999",

        description:
            "Complete career preparation experience.",

        icon: Rocket,

        features: [

            "Everything in Pro",

            "Advanced AI insights",

            "Detailed career reports",

            "Personalized recommendations",

            "Premium analytics",

            "Priority support"

        ],

        button: "Choose Premium",

        popular: false

    }

];


const handleChoosePlan = (
    plan
) => {

    if (plan.name === "Free") {

        return;

    }


    navigate(
        "/payment",
        {
            state: {
                plan: plan.name,
                price: plan.price
            }
        }
    );

};


return (

    <div className="page-container">


        <div
            style={{

                textAlign: "center",

                marginBottom: "45px"

            }}
        >

            <h1>

                Choose Your Plan

            </h1>


            <p
                style={{

                    color:
                        "var(--text-secondary)",

                    marginTop: "10px",

                    fontSize: "16px"

                }}
            >

                Choose the plan that fits
                your career preparation journey.

            </p>

        </div>


        <div
            style={{

                display: "grid",

                gridTemplateColumns:
                    "repeat(auto-fit, minmax(280px, 1fr))",

                gap: "25px",

                maxWidth: "1100px",

                margin: "0 auto"

            }}
        >

            {

                plans.map(

                    (plan) => {

                        const Icon =
                            plan.icon;


                        return (

                            <div

                                key={plan.name}

                                style={{

                                    background: "white",

                                    padding: "30px",

                                    borderRadius: "20px",

                                    border:
                                        plan.popular
                                            ? "2px solid #6366f1"
                                            : "1px solid var(--border-color)",

                                    position:
                                        "relative",

                                    boxShadow:
                                        plan.popular
                                            ? "0 10px 30px rgba(99, 102, 241, 0.15)"
                                            : "none"

                                }}

                            >

                                {

                                    plan.popular && (

                                        <div
                                            style={{

                                                position:
                                                    "absolute",

                                                top: "-14px",

                                                left: "50%",

                                                transform:
                                                    "translateX(-50%)",

                                                background:
                                                    "#6366f1",

                                                color:
                                                    "white",

                                                padding:
                                                    "6px 16px",

                                                borderRadius:
                                                    "20px",

                                                fontSize:
                                                    "13px",

                                                fontWeight:
                                                    "600"

                                            }}
                                        >

                                            MOST POPULAR

                                        </div>

                                    )
                                }


                                <Icon
                                    size={32}
                                />


                                <h2
                                    style={{

                                        marginTop: "20px"

                                    }}
                                >

                                    {plan.name}

                                </h2>


                                <p
                                    style={{

                                        color:
                                            "var(--text-secondary)",

                                        minHeight:
                                            "45px"

                                    }}
                                >

                                    {plan.description}

                                </p>


                                <h1
                                    style={{

                                        margin:
                                            "25px 0"

                                    }}
                                >

                                    {plan.price}

                                    {

                                        plan.price !== "₹0" && (

                                            <span
                                                style={{

                                                    fontSize:
                                                        "14px",

                                                    color:
                                                        "var(--text-secondary)"

                                                }}
                                            >

                                                /month

                                            </span>

                                        )
                                    }

                                </h1>


                                <div
                                    style={{

                                        display:
                                            "flex",

                                        flexDirection:
                                            "column",

                                        gap: "14px",

                                        marginBottom:
                                            "25px"

                                    }}
                                >

                                    {

                                        plan.features.map(

                                            (
                                                feature
                                            ) => (

                                                <div

                                                    key={feature}

                                                    style={{

                                                        display:
                                                            "flex",

                                                        alignItems:
                                                            "center",

                                                        gap:
                                                            "10px"

                                                    }}
                                                >

                                                    <Check
                                                        size={18}
                                                    />

                                                    <span>

                                                        {feature}

                                                    </span>

                                                </div>

                                            )

                                        )
                                    }

                                </div>


                                <button

                                    onClick={() =>
                                        handleChoosePlan(
                                            plan
                                        )
                                    }

                                    disabled={
                                        plan.name === "Free"
                                    }

                                    style={{

                                        width: "100%",

                                        padding:
                                            "13px",

                                        borderRadius:
                                            "10px",

                                        border: "none",

                                        cursor:
                                            plan.name === "Free"
                                                ? "default"
                                                : "pointer",

                                        background:
                                            plan.popular
                                                ? "#6366f1"
                                                : "#f1f5f9",

                                        color:
                                            plan.popular
                                                ? "white"
                                                : "#1e293b",

                                        fontWeight:
                                            "600"

                                    }}

                                >

                                    {plan.button}

                                </button>

                            </div>

                        );

                    }

                )

            }

        </div>

    </div>

);


}

export default Pricing;
