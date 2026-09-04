import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    User,
    Mail,
    Lock,
    ArrowRight
} from "lucide-react";

import AuthLayout from "../../components/layout/AuthLayout";

import {
    registerUser
} from "../../services/authService";

import "../../styles/auth.css";


function Register() {

    const navigate = useNavigate();


    const [formData, setFormData] =
        useState({

            username: "",

            email: "",

            password: "",

            confirm_password: ""

        });


    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]:
                event.target.value

        });

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        setSuccess("");


        if (
            formData.password !==
            formData.confirm_password
        ) {

            setError(
                "Passwords do not match."
            );

            return;

        }


        setLoading(true);


        try {

            await registerUser(formData);


            setSuccess(
                "Account created successfully! Redirecting to login..."
            );


            setTimeout(() => {

                navigate("/");

            }, 1500);

        }

        catch (error) {

            const errorData =
                error.response?.data;


            if (errorData) {

                setError(
                    JSON.stringify(errorData)
                );

            }

            else {

                setError(
                    "Registration failed. Please try again."
                );

            }

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <AuthLayout>

            <div className="auth-container">

                <div className="auth-header">

                    <h1>
                        Create your account 🚀
                    </h1>

                    <p>
                        Start building your intelligent career profile today.
                    </p>

                </div>


                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    {/* Username */}

                    <div className="form-group">

                        <label>
                            Username
                        </label>

                        <div className="auth-input-wrapper">

                            <User size={19} />

                            <input

                                className="auth-input"

                                type="text"

                                name="username"

                                placeholder="Choose a username"

                                value={
                                    formData.username
                                }

                                onChange={handleChange}

                                required

                            />

                        </div>

                    </div>


                    {/* Email */}

                    <div className="form-group">

                        <label>
                            Email Address
                        </label>

                        <div className="auth-input-wrapper">

                            <Mail size={19} />

                            <input

                                className="auth-input"

                                type="email"

                                name="email"

                                placeholder="Enter your email"

                                value={
                                    formData.email
                                }

                                onChange={handleChange}

                                required

                            />

                        </div>

                    </div>


                    {/* Password */}

                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <div className="auth-input-wrapper">

                            <Lock size={19} />

                            <input

                                className="auth-input"

                                type="password"

                                name="password"

                                placeholder="Create a password"

                                value={
                                    formData.password
                                }

                                onChange={handleChange}

                                required

                            />

                        </div>

                    </div>


                    {/* Confirm Password */}

                    <div className="form-group">

                        <label>
                            Confirm Password
                        </label>

                        <div className="auth-input-wrapper">

                            <Lock size={19} />

                            <input

                                className="auth-input"

                                type="password"

                                name="confirm_password"

                                placeholder="Confirm your password"

                                value={
                                    formData.confirm_password
                                }

                                onChange={handleChange}

                                required

                            />

                        </div>

                    </div>


                    {
                        error && (

                            <div className="auth-error">

                                {error}

                            </div>

                        )
                    }


                    {
                        success && (

                            <div className="auth-success">

                                {success}

                            </div>

                        )
                    }


                    <button

                        type="submit"

                        className="auth-submit-button"

                        disabled={loading}

                    >

                        {
                            loading
                                ? "Creating account..."
                                : (
                                    <>
                                        Create Account

                                        <ArrowRight
                                            size={18}
                                        />

                                    </>
                                )
                        }

                    </button>

                </form>


                <div className="auth-switch">

                    Already have an account?

                    {" "}

                    <Link to="/">

                        Sign In

                    </Link>

                </div>

            </div>

        </AuthLayout>

    );

}


export default Register;