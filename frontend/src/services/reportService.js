import api from "./api";


/* ========================= */
/* GET COMBINED REPORT */
/* ========================= */

export const getCombinedReport = async () => {

    const response = await api.get(
        "/reports/"
    );

    return response.data;

};



/* ========================= */
/* GET RESUME ANALYSIS */
/* ========================= */

export const getResumeAnalytics = async () => {

    const response = await api.get(
        "/analysis/"
    );

    return response.data;

};



/* ========================= */
/* GET INTERVIEW ANALYTICS */
/* ========================= */

export const getInterviewAnalytics = async () => {

    const response = await api.get(
        "/evaluation/"
    );

    return response.data;

};