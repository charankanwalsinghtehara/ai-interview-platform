
import { useState } from "react";

import {
    BrainCircuit,
    Code2,
    Database,
    BarChart3,
    Play
} from "lucide-react";

import "./Interview.css";


function InterviewSetup({ onStart }) {

    const [category, setCategory] =
        useState("Data Science");


    const [difficulty, setDifficulty] =
        useState("Medium");


    const [loading, setLoading] =
        useState(false);


    const categories = [

    {
        name: "Data Scientist",
        icon: BrainCircuit
    },

    {
        name: "Data Analyst",
        icon: BarChart3
    },

    {
        name: "Business Analyst",
        icon: BrainCircuit
    }

];


    const handleStart = async () => {

        if (loading) {
            return;
        }

        setLoading(true);

        try {

            await onStart({

    role: category,

    difficulty: difficulty

});

        }

        catch (error) {

            console.error(
                "Interview setup error:",
                error
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="interview-setup">


            {/* HERO */}

            <div className="setup-hero">

                <div className="setup-icon">

                    <BrainCircuit size={38} />

                </div>


                <h2>
                    AI Mock Interview
                </h2>


                <p>

                    Test your knowledge with an
                    intelligent interview experience
                    based on your selected skill area.

                </p>

            </div>


            {/* CATEGORY */}

            <div className="setup-section">

                <h3>
                    Select Interview Category
                </h3>


                <div className="category-selection">

                    {
                        categories.map(

                            ({
                                name,
                                icon: Icon
                            }) => (

                                <button

                                    type="button"

                                    key={name}

                                    className={
                                        `category-option ${
                                            category === name
                                                ? "active"
                                                : ""
                                        }`
                                    }

                                    onClick={() =>
                                        setCategory(name)
                                    }

                                >

                                    <Icon size={24} />

                                    <span>
                                        {name}
                                    </span>

                                </button>

                            )

                        )
                    }

                </div>

            </div>


            {/* DIFFICULTY */}

            <div className="setup-section">

                <h3>
                    Select Difficulty
                </h3>


                <div className="difficulty-selection">

                    {
                        [
                            "Easy",
                            "Medium",
                            "Hard"
                        ].map(

                            (level) => (

                                <button

                                    type="button"

                                    key={level}

                                    className={
                                        `difficulty-option ${
                                            difficulty === level
                                                ? "active"
                                                : ""
                                        }`
                                    }

                                    onClick={() =>
                                        setDifficulty(level)
                                    }

                                >

                                    {level}

                                </button>

                            )

                        )
                    }

                </div>

            </div>


            {/* START */}

            <button

                type="button"

                className="start-interview-button"

                onClick={handleStart}

                disabled={loading}

            >

                <Play size={20} />

                {
                    loading
                        ? "Starting Interview..."
                        : "Start AI Interview"
                }

            </button>


        </div>

    );

}


export default InterviewSetup;

