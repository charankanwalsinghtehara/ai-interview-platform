import api from "./api";


/* ========================= */
/* CREATE PAYMENT ORDER */
/* ========================= */

export const createPaymentOrder = async (
    amount
) => {

    const response = await api.post(

        "/payments/create-order/",

        {
            amount: amount
        }

    );

    return response.data;

};



/* ========================= */
/* VERIFY PAYMENT */
/* ========================= */

export const verifyPayment = async (
    paymentData
) => {

    const response = await api.post(

        "/payments/verify/",

        paymentData

    );

    return response.data;

};