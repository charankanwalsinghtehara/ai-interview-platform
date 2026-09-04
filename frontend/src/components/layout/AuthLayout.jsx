import { BrainCircuit, Sparkles, BarChart3 } from "lucide-react";

import "./AuthLayout.css";


function AuthLayout({ children }) {

    return (

        <div className="auth-layout">

            {/* LEFT SIDE */}

            <div className="auth-brand-section">

                <div className="auth-brand">

                    <div className="auth-logo">

                        <BrainCircuit size={32} />

                    </div>

                    <h2>
                        AI Interview
                    </h2>

                </div>


                <div className="auth-brand-content">

                    <div className="auth-badge">

                        <Sparkles size={16} />

                        AI Powered Career Intelligence

                    </div>


                    <h1>
                        Build Your Career With
                        <span> Intelligence.</span>
                    </h1>


                    <p>

                        Analyze your resume, evaluate your
                        interview performance, and discover
                        job opportunities that match your skills.

                    </p>


                    <div className="auth-features">

                        <div className="auth-feature">

                            <BrainCircuit size={22} />

                            <div>

                                <strong>
                                    Smart Resume Analysis
                                </strong>

                                <span>
                                    Understand your professional strengths
                                </span>

                            </div>

                        </div>


                        <div className="auth-feature">

                            <BarChart3 size={22} />

                            <div>

                                <strong>
                                    Career Analytics
                                </strong>

                                <span>
                                    Track your performance and growth
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="auth-footer-text">

                    © 2026 AI Interview Platform

                </div>

            </div>


            {/* RIGHT SIDE */}

            <div className="auth-form-section">

                {children}

            </div>

        </div>

    );

}


export default AuthLayout;