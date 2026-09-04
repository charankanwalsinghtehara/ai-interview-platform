import {
    Bell,
    Search,
    UserCircle
} from "lucide-react";

import {
    useAuth
} from "../../context/AuthContext";

import "./Header.css";


function Header() {

    const { user } = useAuth();


    const username =
        user?.username ||
        "Candidate";


    return (

        <header className="header">


            {/* SEARCH */}

            <div className="header-search">

                <Search size={20} />

                <input
                    type="text"
                    placeholder="Search..."
                />

            </div>


            {/* USER ACTIONS */}

            <div className="header-actions">


                <button

                    type="button"

                    className="icon-button"

                    aria-label="Notifications"

                >

                    <Bell size={20} />

                </button>


                <div className="user-profile">


                    <UserCircle size={34} />


                    <div>

                        <strong>

                            {username}

                        </strong>


                        <span>

                            AI Career Platform

                        </span>

                    </div>


                </div>


            </div>


        </header>

    );

}


export default Header;