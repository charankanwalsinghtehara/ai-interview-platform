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

    getInterviewReport

} from "../../services/interviewService";


function Interview() {

    const [stage, setStage] =
        useState("setup");


    const [interview, setInterview] =
        useState(null);


    const [questions, setQuestions] =
        useState([]);


    const [currentQuestionIndex, setCurrentQuestionIndex] =
        useState(0);


    const [report, setReport] =
        useState(null);


    const handleStartInterview = async (
        setupData
    ) => {

        try {

            const data =
                await startInterview(
                    setupData
                );


            setInterview(data);


            setQuestions(
                data.questions || []
            );


            setCurrentQuestionIndex(0);


            setStage("question");

        }

        catch (error) {

            console.error(
                "Interview start error:",
                error
            );

        }

    };


    const handleSubmitAnswer = async (
        answer
    ) => {

        if (!interview) {

            return;

        }


        const currentQuestion =
            questions[
                currentQuestionIndex
            ];


        try {

            await submitAnswer(

    currentQuestion.id,

    {

        answer: answer

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


                setReport(reportData);

                setStage("result");

            }

            else {

                setCurrentQuestionIndex(

                    currentQuestionIndex + 1

                );

            }

        }

        catch (error) {

            console.error(
                "Answer submission error:",
                error
            );

        }

    };


    const currentQuestion =
        questions[
            currentQuestionIndex
        ];


    return (

        <div className="page-container">

            <PageHeader

                title="AI Interview"

                subtitle="Practice your skills with an intelligent interview experience."

            />


            {
                stage === "setup" && (

                    <InterviewSetup

                        onStart={
                            handleStartInterview
                        }

                    />

                )
            }


            {
                stage === "question" &&
                currentQuestion && (

                    <InterviewQuestion

                        question={
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

                    />

                )
            }


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