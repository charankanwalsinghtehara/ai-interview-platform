import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
CreditCard,
Smartphone,
CheckCircle,
Loader
} from "lucide-react";

import {
createSubscription,
confirmSubscriptionPayment
} from "../../services/paymentService";

import "./Payment.css";


function Payment() {


const navigate = useNavigate();
const location = useLocation();

const plan = location.state?.plan || "PRO";

const [paymentMethod, setPaymentMethod] = useState("UPI");
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);
const [error, setError] = useState("");


const prices = {

    PRO: 499,

    PREMIUM: 999

};


const amount = prices[plan] || 499;


const handlePayment = async () => {

    try {

        setLoading(true);
        setError("");


        // STEP 1: CREATE SUBSCRIPTION

        const subscriptionData =
            await createSubscription(plan);


        // STEP 2: CONFIRM DEMO PAYMENT

        await confirmSubscriptionPayment(

            subscriptionData.subscription_id,

            paymentMethod

        );


        setSuccess(true);


        setTimeout(() => {

            navigate("/dashboard");

        }, 2500);


    } catch (error) {

        console.error(
            "Payment error:",
            error.response?.data || error
        );


        setError(

            error.response?.data?.error ||

            "Unable to process demo payment."

        );

    } finally {

        setLoading(false);

    }

};


if (success) {

    return (

        <div className="payment-page">

            <div className="payment-success">

                <CheckCircle size={70} />

                <h1>
                    Payment Successful! 🎉
                </h1>

                <p>
                    Your {plan} subscription is now active.
                </p>

                <p className="redirect-text">
                    Redirecting you to dashboard...
                </p>

            </div>

        </div>

    );

}


return (

    <div className="payment-page">

        <div className="payment-container">


            <div className="payment-header">

                <h1>
                    Complete Your Payment
                </h1>

                <p>
                    This is a demo payment for the AI Interview Platform.
                </p>

            </div>


            <div className="payment-summary">

                <div>

                    <span>Selected Plan</span>

                    <strong>
                        {plan}
                    </strong>

                </div>


                <div>

                    <span>Amount</span>

                    <strong>
                        ₹{amount}
                    </strong>

                </div>

            </div>


            <h3>
                Select Payment Method
            </h3>


            <div className="payment-methods">


                <button

                    className={
                        paymentMethod === "UPI"
                            ? "payment-method active"
                            : "payment-method"
                    }

                    onClick={() =>
                        setPaymentMethod("UPI")
                    }

                >

                    <Smartphone size={24} />

                    <span>
                        UPI
                    </span>

                </button>


                <button

                    className={
                        paymentMethod === "CARD"
                            ? "payment-method active"
                            : "payment-method"
                    }

                    onClick={() =>
                        setPaymentMethod("CARD")
                    }

                >

                    <CreditCard size={24} />

                    <span>
                        Card
                    </span>

                </button>


            </div>


            {error && (

                <div className="payment-error">

                    {error}

                </div>

            )}


            <button

                className="pay-button"

                onClick={handlePayment}

                disabled={loading}

            >

                {loading

                    ? (

                        <>
                            <Loader
                                size={20}
                                className="spin"
                            />

                            Processing...

                        </>

                    )

                    : (

                        `Pay ₹${amount}`

                    )

                }

            </button>


            <p className="demo-note">

                🔒 Demo payment system — no real money
                will be charged.

            </p>


        </div>

    </div>

);


}



export default Payment;
