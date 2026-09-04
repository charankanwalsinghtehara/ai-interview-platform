import api from "./api";


export const getCareerAnalysis = async () => {

    const response = await api.get(
        "/analytics/career-analysis/"
    );

    return response.data;

};