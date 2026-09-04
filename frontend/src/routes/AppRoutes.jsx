import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";

import Profile from "../pages/profile/Profile";

import Resume from "../pages/resume/Resume";

import Interview from "../pages/interview/Interview";

import Reports from "../pages/reports/Reports";

import Jobs from "../pages/jobs/Jobs";

import Contribution from "../pages/contribution/Contribution";
import CareerAnalytics from "../pages/career/CareerAnalytics";


function AppRoutes() {

    return (

        <Routes>


            {/* ========================= */}
            {/* DEFAULT */}
            {/* ========================= */}

            <Route

                path="/"

                element={
                    <Navigate
                        to="/dashboard"
                        replace
                    />
                }

            />


            {/* ========================= */}
            {/* AUTHENTICATION */}
            {/* ========================= */}

            <Route

                path="/login"

                element={<Login />}

            />


            <Route

                path="/register"

                element={<Register />}

            />


            {/* ========================= */}
            {/* DASHBOARD */}
            {/* ========================= */}

            <Route

                path="/dashboard"

                element={<Dashboard />}

            />


            {/* ========================= */}
            {/* PROFILE */}
            {/* ========================= */}

            <Route

                path="/profile"

                element={<Profile />}

            />


            {/* ========================= */}
            {/* RESUME */}
            {/* ========================= */}

            <Route

                path="/resume"

                element={<Resume />}

            />


            {/* ========================= */}
            {/* AI INTERVIEW */}
            {/* ========================= */}

            <Route

                path="/interview"

                element={<Interview />}

            />


            {/* ========================= */}
            {/* REPORTS */}
            {/* ========================= */}

            <Route

                path="/reports"

                element={<Reports />}

            />


            {/* ========================= */}
            {/* JOBS */}
            {/* ========================= */}

            <Route

                path="/jobs"

                element={<Jobs />}

            />


            {/* ========================= */}
            {/* CONTRIBUTION */}
            {/* ========================= */}

            <Route

                path="/contribution"

                element={<Contribution />}

            />


            <Route
    path="/career-analytics"
    element={<CareerAnalytics />}
/>


            {/* ========================= */}
            {/* 404 */}
            {/* ========================= */}

            <Route

                path="*"

                element={
                    <Navigate
                        to="/dashboard"
                        replace
                    />
                }

            />


        </Routes>

        

    );

}


export default AppRoutes;