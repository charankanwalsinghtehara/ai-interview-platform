import {
    Heart,
    Coffee,
    Sparkles,
    Loader
} from "lucide-react";

import {
    useState
} from "react";

import {
    createPaymentOrder,
    verifyPayment
} from "../../services/paymentService";

import "./Payment.css";


function ContributionCard() {

    const [amount, setAmount] =
        useState(99);


    const [loading, setLoading] =
        useState(false);


    const handleContribution = async () => {

        try {

            setLoading(true);


            const order =
                await createPaymentOrder(
                    amount
                );


            /*
            PAYMENT GATEWAY
            WILL OPEN HERE

            Example:
            Razorpay Checkout

            After successful payment:
            verifyPayment()
            */


            console.log(
                "Payment order:",
                order
            );


            /*
            Temporary structure.
            Actual Razorpay integration
            will be connected after the
            Django payment backend is ready.
            */

        }

        catch (error) {

            console.error(
                "Payment error:",
                error
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="contribution-card">


            <div className="contribution-icon">

                <Heart size={35} />

            </div>


            <h1>
                Support the Platform ❤️
            </h1>


            <p>
                If our AI Interview and Career
                Intelligence Platform helped you,
                you can optionally contribute to
                support future development.
            </p>


            {/* AMOUNT OPTIONS */}

            <div className="amount-options">

                {
                    [
                        49,
                        99,
                        199,
                        499
                    ].map(

                        (value) => (

                            <button

                                key={value}

                                className={
                                    amount === value
                                        ? "amount active"
                                        : "amount"
                                }

                                onClick={() =>
                                    setAmount(value)
                                }

                            >

                                ₹{value}

                            </button>

                        )

                    )
                }

            </div>


            {/* CUSTOM AMOUNT */}

            <div className="custom-amount">

                <span>
                    ₹
                </span>


                <input

                    type="number"

                    min="1"

                    value={amount}

                    onChange={(event) =>
                        setAmount(
                            Number(
                                event.target.value
                            )
                        )
                    }

                />

            </div>


            <button

                className="contribute-button"

                onClick={handleContribution}

                disabled={
                    loading ||
                    amount < 1
                }

            >

                {
                    loading

                        ? (

                            <>

                                <Loader
                                    size={20}
                                />

                                Processing...

                            </>

                        )

                        : (

                            <>

                                <Heart
                                    size={20}
                                />

                                Contribute ₹{amount}

                            </>

                        )
                }

            </button>


            <div className="contribution-note">

                <Coffee size={17} />

                <span>
                    Your contribution helps support
                    the development of the platform.
                </span>

            </div>


            <div className="secure-payment">

                <Sparkles size={16} />

                Secure payment processing

            </div>

        </div>

    );

}


export default ContributionCard;