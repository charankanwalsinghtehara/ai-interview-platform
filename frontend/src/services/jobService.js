import api from "./api";


/* ========================= */
/* GET JOB RECOMMENDATIONS */
/* ========================= */

export const getJobRecommendations = async () => {

    const response = await api.get(
        "/jobs/recommendations/"
    );

    return response.data;

};



/* ========================= */
/* GET JOB DETAILS */
/* ========================= */

export const getJobDetails = async (
    jobId
) => {

    const response = await api.get(
        `/jobs/${jobId}/`
    );

    return response.data;

};