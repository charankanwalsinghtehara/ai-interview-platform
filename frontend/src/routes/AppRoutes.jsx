import {
Routes,
Route,
Navigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

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
import Pricing from "../pages/pricing/Pricing";
import Payment from "../pages/payment/Payment";

import ProtectedRoute from "./ProtectedRoute";

function PublicRoute({ children }) {


const { isAuthenticated } = useAuth();

if (isAuthenticated) {

    return (
        <Navigate
            to="/dashboard"
            replace
        />
    );

}

return children;


}

function AppRoutes() {


return (

    <Routes>

        <Route
            path="/"
            element={
                <Navigate
                    to="/dashboard"
                    replace
                />
            }
        />


        <Route
            path="/login"
            element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            }
        />


        <Route
            path="/register"
            element={
                <PublicRoute>
                    <Register />
                </PublicRoute>
            }
        />


        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            }
        />


        <Route
            path="/profile"
            element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            }
        />


        <Route
            path="/resume"
            element={
                <ProtectedRoute>
                    <Resume />
                </ProtectedRoute>
            }
        />


        <Route
            path="/interview"
            element={
                <ProtectedRoute>
                    <Interview />
                </ProtectedRoute>
            }
        />


        <Route
            path="/reports"
            element={
                <ProtectedRoute>
                    <Reports />
                </ProtectedRoute>
            }
        />


        <Route
            path="/jobs"
            element={
                <ProtectedRoute>
                    <Jobs />
                </ProtectedRoute>
            }
        />


        <Route
            path="/career-analytics"
            element={
                <ProtectedRoute>
                    <CareerAnalytics />
                </ProtectedRoute>
            }
        />


        <Route
            path="/contribution"
            element={
                <ProtectedRoute>
                    <Contribution />
                </ProtectedRoute>
            }
        />


        <Route
            path="/pricing"
            element={
                <ProtectedRoute>
                    <Pricing />
                </ProtectedRoute>
            }
        />


        <Route
            path="/payment"
            element={
                <ProtectedRoute>
                    <Payment />
                </ProtectedRoute>
            }
        />


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
