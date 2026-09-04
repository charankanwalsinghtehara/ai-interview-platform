import {
useState
} from "react";

import {
Send,
MessageSquare
} from "lucide-react";

import "./Interview.css";

function InterviewQuestion({


question,

questionNumber,

totalQuestions,

onSubmit


}) {


const [answer, setAnswer] =
    useState("");

const [loading, setLoading] =
    useState(false);

const [error, setError] =
    useState("");


const handleSubmit = async () => {

    if (!answer.trim()) {

        return;

    }


    setLoading(true);

    setError("");


    try {

        await onSubmit(
            answer
        );


        setAnswer("");

    }

    catch (error) {

        console.error(
            "Submit answer error:",
            error
        );

        setError(
            "Failed to submit your answer. Please try again."
        );

    }

    finally {

        setLoading(false);

    }

};


const progress =

    (questionNumber / totalQuestions)
    * 100;


return (

    <div className="interview-question">


        {/* PROGRESS */}

        <div className="interview-progress-header">

            <div>

                <span>
                    Question {questionNumber}
                </span>

                <strong>
                    of {totalQuestions}
                </strong>

            </div>


            <div className="interview-progress">

                <div

                    className="interview-progress-fill"

                    style={{

                        width: `${progress}%`

                    }}

                />

            </div>

        </div>


        {/* QUESTION */}

        <div className="question-card">

            <div className="question-icon">

                <MessageSquare
                    size={25}
                />

            </div>


            <h2>
                {question}
            </h2>

        </div>


        {/* ANSWER */}

        <div className="answer-card">

            <label>
                Your Answer
            </label>


            <textarea

                value={answer}

                onChange={(event) =>
                    setAnswer(
                        event.target.value
                    )
                }

                placeholder="Write your answer here..."

                rows="8"

                disabled={loading}

            />


            {
                error && (

                    <div className="interview-error">

                        {error}

                    </div>

                )
            }


            <div className="answer-footer">

                <span>

                    {answer.length} characters

                </span>


                <button

                    className="submit-answer-button"

                    onClick={handleSubmit}

                    disabled={
                        loading ||
                        !answer.trim()
                    }

                >

                    <Send size={18} />

                    {
                        loading
                            ? "Submitting..."
                            : "Submit Answer"
                    }

                </button>

            </div>

        </div>

    </div>

);


}

export default InterviewQuestion;
