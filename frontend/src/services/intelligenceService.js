import api from "./api";


export const analyzeActiveResume = async () => {

    const response = await api.post(
        "/intelligence/analyze/"
    );

    return response.data;

};