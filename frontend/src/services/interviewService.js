import api from "./api";


/* ========================= */
/* START INTERVIEW */
/* ========================= */

export const startInterview = async (
    interviewData
) => {

    const response = await api.post(

        "/interviews/start/",

        interviewData

    );

    return response.data;

};



/* ========================= */
/* SUBMIT ANSWER */
/* ========================= */

export const submitAnswer = async (
    questionId,
    answerData
) => {

    const response = await api.post(

        `/interviews/questions/${questionId}/answer/`,

        answerData

    );

    return response.data;

};



/* ========================= */
/* COMPLETE INTERVIEW */
/* ========================= */

export const completeInterview = async (
    interviewId
) => {

    const response = await api.post(

        `/interviews/${interviewId}/complete/`

    );

    return response.data;

};



/* ========================= */
/* GET INTERVIEW REPORT */
/* ========================= */

export const getInterviewReport = async (
interviewId
) => {


const response = await api.post(

    `/evaluation/interviews/${interviewId}/report/`

);

return response.data;


};
