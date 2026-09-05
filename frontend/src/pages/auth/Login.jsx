import { useState } from "react";

import {
Link,
useNavigate
} from "react-router-dom";

import {
User,
Lock,
ArrowRight
} from "lucide-react";

import AuthLayout from "../../components/layout/AuthLayout";

import {
loginUser
} from "../../services/authService";

import {
useAuth
} from "../../context/AuthContext";

import "../../styles/auth.css";

function Login() {


const navigate = useNavigate();

const { login } = useAuth();


const [formData, setFormData] =
    useState({

        username: "",
        password: ""

    });


const [loading, setLoading] =
    useState(false);


const [error, setError] =
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

    setLoading(true);

    setError("");


    try {

        const data =
            await loginUser(formData);


        console.log(
            "Login API response:",
            data
        );


        if (!data.access) {

            setError(
                "Login failed. Access token was not received."
            );

            return;

        }


        login(

            data.user || {
                username: formData.username
            },

            data.access,

            data.refresh

        );


        navigate(
            "/dashboard",
            {
                replace: true
            }
        );

    }

    catch (error) {

        console.error(
            "Login error:",
            error
        );


        setError(

            error.response?.data?.detail ||

            "Login failed. Please check your credentials."

        );

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
                    Welcome back 👋
                </h1>

                <p>
                    Sign in to continue your career journey.
                </p>

            </div>


            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

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

                            placeholder="Enter your username"

                            value={
                                formData.username
                            }

                            onChange={
                                handleChange
                            }

                            required

                        />

                    </div>

                </div>


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

                            placeholder="Enter your password"

                            value={
                                formData.password
                            }

                            onChange={
                                handleChange
                            }

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


                <button

                    type="submit"

                    className="auth-submit-button"

                    disabled={loading}

                >

                    {

                        loading

                            ? "Signing in..."

                            : (

                                <>

                                    Sign In

                                    <ArrowRight
                                        size={18}
                                    />

                                </>

                            )

                    }

                </button>

            </form>


            <div className="auth-switch">

                Don't have an account?

                {" "}

                <Link to="/register">

                    Create Account

                </Link>

            </div>

        </div>

    </AuthLayout>

);


}

export default Login;
