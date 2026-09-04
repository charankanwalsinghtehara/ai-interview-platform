import api from "./api";


/* =========================
   UPLOAD RESUME
========================= */

export const uploadResume = async (file) => {

    const formData = new FormData();

    formData.append("file", file);


    const response = await api.post(

        "/resumes/upload/",

        formData

    );


    return response.data;

};



/* =========================
   GET ALL RESUMES
========================= */

export const getResumes = async () => {

    const response = await api.get(
        "/resumes/"
    );

    return response.data;

};



/* =========================
   GET ACTIVE RESUME
========================= */

export const getActiveResume = async () => {

    const response = await api.get(
        "/resumes/active/"
    );

    return response.data;

};



/* =========================
   SET ACTIVE RESUME
========================= */

export const setActiveResume = async (id) => {

    const response = await api.post(
        `/resumes/${id}/set-active/`
    );

    return response.data;

};



/* =========================
   DELETE RESUME
========================= */

export const deleteResume = async (id) => {

    const response = await api.delete(
        `/resumes/${id}/delete/`
    );

    return response.data;

};