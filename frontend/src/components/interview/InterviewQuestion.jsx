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
onSubmit,
loading


}) {


const [answer, setAnswer] =
    useState("");


const handleSubmit = async () => {

    if (!answer.trim()) {

        return;

    }


    await onSubmit(
        answer
    );


    setAnswer("");

};


const progress =

    totalQuestions > 0

        ? (
            questionNumber /
            totalQuestions
        ) * 100

        : 0;


return (

    <div className="interview-question">


        <div className="interview-progress-header">

            <div>

                <span>
                    Question {questionNumber}
                </span>

                <strong>
                    {" "}of {totalQuestions}
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


        <div className="question-card">

            <div className="question-icon">

                <MessageSquare
                    size={25}
                />

            </div>


            <h2>

                {question ||
                    "Question not available."}

            </h2>

        </div>


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

                rows={8}

                disabled={loading}

            />


            <div className="answer-footer">

                <span>

                    {answer.length} characters

                </span>


                <button

                    type="button"

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
