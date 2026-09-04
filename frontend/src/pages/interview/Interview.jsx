import {
useState
} from "react";

import PageHeader from "../../components/common/PageHeader";

import InterviewSetup from "../../components/interview/InterviewSetup";

import InterviewQuestion from "../../components/interview/InterviewQuestion";
import InterviewResult from "../../components/interview/InterviewResult";

import {
    startInterview,
    submitAnswer,
    completeInterview,
    getInterviewReport,
     
} from "../../services/interviewService";;

function Interview() {

const [stage, setStage] =
    useState("setup");


const [loading, setLoading] =
    useState(false);


const [error, setError] =
    useState("");


const [interview, setInterview] =
    useState(null);


const [questions, setQuestions] =
    useState([]);


const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);

const [report, setReport] =
    useState(null);

const [submitting, setSubmitting] =
    useState(false);




const handleStart = async (data) => {

    try {

        setLoading(true);

        setError("");


        const response =
            await startInterview(data);


        console.log(
            "Interview API response:",
            response
        );


        const interviewData =
            response.interview;


        setInterview(interviewData);


        setQuestions(
            interviewData.questions || []
        );


        setCurrentQuestionIndex(0);


        if (
            interviewData.questions &&
            interviewData.questions.length > 0
        ) {

            setStage("question");

        }

        else {

            setError(
                "No interview questions were generated."
            );

        }

    }

    catch (error) {

        console.error(
            "Interview start error:",
            error.response?.data || error
        );


        setError(

            error.response?.data?.error ||

            error.response?.data?.detail ||

            "Unable to start the interview."

        );

    }

    finally {

        setLoading(false);

    }

};


const handleSubmitAnswer = async (
answerText
) => {


if (submitting) {

    return;

}


const currentQuestion =
    questions[currentQuestionIndex];


if (!currentQuestion) {

    return;

}


try {

    setSubmitting(true);

    setLoading(true);

    setError("");


    console.log(
        "Submitting answer for question:",
        currentQuestion.id
    );


    await submitAnswer(

        currentQuestion.id,

        {
            answer_text: answerText
        }

    );


    const isLastQuestion =

        currentQuestionIndex ===
        questions.length - 1;


    if (isLastQuestion) {

        await completeInterview(
            interview.id
        );


        const reportData =
            await getInterviewReport(
                interview.id
            );


        console.log(
            "Interview report:",
            reportData
        );


        setReport(reportData);


        setStage("result");

    }

    else {

        setCurrentQuestionIndex(
            (previousIndex) =>
                previousIndex + 1
        );

    }

}

catch (error) {

    console.error(
        "Answer submission error:",
        error.response?.data || error
    );


    setError(

        error.response?.data?.error ||

        error.response?.data?.detail ||

        "Unable to submit your answer."

    );

}

finally {

    setSubmitting(false);

    setLoading(false);

}


};


const currentQuestion =
    questions[currentQuestionIndex];


return (

    <div className="page-container">

        <PageHeader

            title="AI Interview"

            subtitle="Practice your skills with an intelligent interview experience."

        />


        {
            error && (

                <div className="resume-error">

                    {error}

                </div>

            )
        }


        {
            stage === "setup" && (

                <InterviewSetup

                    onStart={handleStart}

                    loading={loading || submitting}

                />

            )
        }


              {
            stage === "question" &&
            currentQuestion && (

                <InterviewQuestion

                    question={
                        currentQuestion.question_text ||
                        currentQuestion.question
                    }

                    questionNumber={
                        currentQuestionIndex + 1
                    }

                    totalQuestions={
                        questions.length
                    }

                    onSubmit={
                        handleSubmitAnswer
                    }

                    loading={loading || submitting}

                />

            )
        }


        {/* RESULT */}

        {
            stage === "result" && (

                <InterviewResult

                    report={report}

                />

            )
        }

    </div>

);

}


export default Interview;
