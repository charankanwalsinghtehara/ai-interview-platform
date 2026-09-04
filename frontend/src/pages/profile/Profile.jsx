import {
useEffect,
useState
} from "react";

import {
User,
Mail,
Calendar,
Edit3,
Save,
X
} from "lucide-react";

import {
getProfile,
updateProfile
} from "../../services/profileService";

function Profile() {


const [profile, setProfile] =
    useState(null);

const [loading, setLoading] =
    useState(true);

const [editing, setEditing] =
    useState(false);

const [error, setError] =
    useState("");

const [success, setSuccess] =
    useState("");

const [firstName, setFirstName] =
    useState("");

const [lastName, setLastName] =
    useState("");


useEffect(() => {

    loadProfile();

}, []);


const loadProfile = async () => {

    try {

        setLoading(true);

        setError("");


        const data =
            await getProfile();


        setProfile(data);


        setFirstName(
            data.first_name || ""
        );


        setLastName(
            data.last_name || ""
        );

    }

    catch (error) {

        console.error(
            "Profile loading error:",
            error.response?.data || error
        );


        setError(
            "Unable to load profile."
        );

    }

    finally {

        setLoading(false);

    }

};


const handleSave = async () => {

    try {

        setError("");

        setSuccess("");


        const updatedProfile =
            await updateProfile({

                first_name: firstName,

                last_name: lastName

            });


        setProfile(updatedProfile);


        setEditing(false);


        setSuccess(
            "Profile updated successfully!"
        );

    }

    catch (error) {

        console.error(
            "Profile update error:",
            error.response?.data || error
        );


        setError(
            "Unable to update profile."
        );

    }

};


const handleCancel = () => {

    setFirstName(
        profile?.first_name || ""
    );


    setLastName(
        profile?.last_name || ""
    );


    setEditing(false);


    setError("");

};


if (loading) {

    return (

        <div className="page-container">

            <p>
                Loading profile...
            </p>

        </div>

    );

}


return (

    <div className="page-container">

        <div
            style={{

                background: "white",

                padding: "30px",

                borderRadius: "18px",

                border:
                    "1px solid var(--border-color)"

            }}
        >


            <div
                style={{

                    display: "flex",

                    justifyContent:
                        "space-between",

                    alignItems:
                        "center",

                    marginBottom:
                        "30px"

                }}
            >

                <div>

                    <h1>
                        My Profile
                    </h1>


                    <p
                        style={{

                            color:
                                "var(--text-secondary)",

                            marginTop:
                                "8px"

                        }}
                    >

                        Manage your account
                        and profile information.

                    </p>

                </div>


                {
                    !editing && (

                        <button

                            onClick={() =>
                                setEditing(true)
                            }

                        >

                            <Edit3 size={18} />

                            Edit Profile

                        </button>

                    )
                }

            </div>


            {
                error && (

                    <p
                        style={{
                            color: "red"
                        }}
                    >

                        {error}

                    </p>

                )
            }


            {
                success && (

                    <p
                        style={{
                            color: "green"
                        }}
                    >

                        {success}

                    </p>

                )
            }


            <div
                style={{

                    display: "flex",

                    flexDirection:
                        "column",

                    gap: "25px"

                }}
            >


                {/* NAME */}

                <div
                    style={{

                        display: "flex",

                        alignItems:
                            "center",

                        gap: "15px"

                    }}
                >

                    <User size={22} />


                    <div
                        style={{
                            flex: 1
                        }}
                    >

                        <strong>
                            Name
                        </strong>


                        {
                            editing

                                ? (

                                    <div
                                        style={{

                                            display: "flex",

                                            gap: "10px",

                                            marginTop:
                                                "8px"

                                        }}
                                    >

                                        <input

                                            value={firstName}

                                            onChange={(event) =>
                                                setFirstName(
                                                    event.target.value
                                                )
                                            }

                                            placeholder="First name"

                                        />


                                        <input

                                            value={lastName}

                                            onChange={(event) =>
                                                setLastName(
                                                    event.target.value
                                                )
                                            }

                                            placeholder="Last name"

                                        />

                                    </div>

                                )

                                : (

                                    <p>

                                        {
                                            `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim()
                                            ||
                                            profile?.username
                                        }

                                    </p>

                                )
                        }

                    </div>

                </div>


                {/* EMAIL */}

                <div
                    style={{

                        display: "flex",

                        alignItems:
                            "center",

                        gap: "15px"

                    }}
                >

                    <Mail size={22} />


                    <div>

                        <strong>
                            Email
                        </strong>


                        <p>

                            {
                                profile?.email
                            }

                        </p>

                    </div>

                </div>


                {/* USERNAME */}

                <div
                    style={{

                        display: "flex",

                        alignItems:
                            "center",

                        gap: "15px"

                    }}
                >

                    <User size={22} />


                    <div>

                        <strong>
                            Username
                        </strong>


                        <p>

                            {
                                profile?.username
                            }

                        </p>

                    </div>

                </div>


                {/* STATUS */}

                <div
                    style={{

                        display: "flex",

                        alignItems:
                            "center",

                        gap: "15px"

                    }}
                >

                    <Calendar size={22} />


                    <div>

                        <strong>
                            Account Status
                        </strong>


                        <p>
                            Active
                        </p>

                    </div>

                </div>

            </div>


            {
                editing && (

                    <div
                        style={{

                            display: "flex",

                            gap: "12px",

                            marginTop:
                                "30px"

                        }}
                    >

                        <button
                            onClick={handleSave}
                        >

                            <Save size={18} />

                            Save Changes

                        </button>


                        <button
                            onClick={handleCancel}
                        >

                            <X size={18} />

                            Cancel

                        </button>

                    </div>

                )
            }

        </div>

    </div>

);


}

export default Profile;
