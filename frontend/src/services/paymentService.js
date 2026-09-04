import api from "./api";

/* ========================================= */
/* CONTRIBUTION PAYMENT */
/* ========================================= */

export const createPaymentOrder = async (amount) => {


const response = await api.post(

    "/payments/create-order/",

    {
        amount: amount
    }

);

return response.data;


};

export const verifyPayment = async (paymentData) => {


const response = await api.post(

    "/payments/verify/",

    paymentData

);

return response.data;


};

/* ========================================= */
/* DEMO SUBSCRIPTION */
/* ========================================= */

export const createSubscription = async (plan) => {


const response = await api.post(

    "/payments/subscription/create/",

    {
        plan: plan
    }

);

return response.data;


};

/* ========================================= */
/* CONFIRM DEMO PAYMENT */
/* ========================================= */

export const confirmSubscriptionPayment = async (


subscriptionId,
paymentMethod = "DEMO"


) => {


const response = await api.post(

    "/payments/subscription/confirm/",

    {

        subscription_id: subscriptionId,

        payment_method: paymentMethod

    }

);

return response.data;


};

/* ========================================= */
/* SUBSCRIPTION STATUS */
/* ========================================= */

export const getSubscriptionStatus = async () => {


const response = await api.get(

    "/payments/subscription/status/"

);

return response.data;


};

export const getSubscriptionUsage = async () => {

    const response = await api.get(
        "/payments/subscription/usage/"
    );

    return response.data;

};