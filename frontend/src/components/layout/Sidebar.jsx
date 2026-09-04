import { NavLink, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    BarChart3,
    BriefcaseBusiness,
    Heart,
    LogOut,
    BrainCircuit
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import "./Sidebar.css";


function Sidebar() {

    const navigate = useNavigate();

    const { logout } = useAuth();


    const handleLogout = () => {

        logout();

        navigate("/");

    };


    const menuItems = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard
        },

        {
            name: "Resume",
            path: "/resume",
            icon: FileText
        },

        {
            name: "AI Interview",
            path: "/interview",
            icon: MessageSquare
        },

        {
            name: "Reports",
            path: "/reports",
            icon: BarChart3
        },

        {
            name: "Job Matches",
            path: "/jobs",
            icon: BriefcaseBusiness
        }

    ];


    return (

        <aside className="sidebar">

            {/* Logo */}

            <div className="sidebar-logo">

                <div className="logo-icon">

                    <BrainCircuit size={28} />

                </div>


                <div>

                    <h2>
                        AI Interview
                    </h2>

                    <span>
                        Career Intelligence
                    </span>

                </div>

            </div>


            {/* Navigation */}

            <nav className="sidebar-nav">

                <p className="nav-label">
                    MAIN MENU
                </p>


                {
                    menuItems.map((item) => {

                        const Icon = item.icon;

                        return (

                            <NavLink

                                key={item.path}

                                to={item.path}

                                className={({ isActive }) =>
                                    `sidebar-link ${
                                        isActive
                                            ? "active"
                                            : ""
                                    }`
                                }

                            >

                                <Icon size={20} />

                                <span>
                                    {item.name}
                                </span>

                            </NavLink>

                        );

                    })
                }


                <p className="nav-label">
                    SUPPORT
                </p>


                <NavLink

                    to="/contribution"

                    className={({ isActive }) =>
                        `sidebar-link ${
                            isActive
                                ? "active"
                                : ""
                        }`
                    }

                >

                    <Heart size={20} />

                    <span>
                        Contribute
                    </span>

                </NavLink>

            </nav>


            {/* Logout */}

            <div className="sidebar-footer">

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >

                    <LogOut size={20} />

                    <span>
                        Logout
                    </span>

                </button>

            </div>

        </aside>

    );

}


export default Sidebar;