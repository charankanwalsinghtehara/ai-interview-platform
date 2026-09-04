import api from "./api";


/* =========================
   ANALYTICS DASHBOARD
========================= */

export const getAnalyticsDashboard = async () => {

    const response = await api.get(
        "/analytics/dashboard/"
    );

    return response.data;

};


/* =========================
   POWER BI RESUME DATA
========================= */

export const getPowerBIData = async () => {

    const response = await api.get(
        "/analytics/powerbi-data/"
    );

    return response.data;

};


/* =========================
   CAREER ANALYSIS
========================= */

export const getCareerAnalysis = async () => {

    const response = await api.get(
        "/analytics/career-analysis/"
    );

    return response.data;

};


/* =========================
   POWER BI CAREER DATA
========================= */

export const getPowerBICareerData = async () => {

    const response = await api.get(
        "/analytics/powerbi-career-data/"
    );

    return response.data;

};