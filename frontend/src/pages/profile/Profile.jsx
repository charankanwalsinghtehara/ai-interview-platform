import { User, Mail, Calendar } from "lucide-react";

function Profile() {

```
return (

    <div className="page-container">

        <div
            style={{
                background: "white",
                padding: "30px",
                borderRadius: "18px",
                border: "1px solid var(--border-color)"
            }}
        >

            <h1>My Profile</h1>

            <p
                style={{
                    color: "var(--text-secondary)",
                    marginTop: "8px",
                    marginBottom: "30px"
                }}
            >
                Manage your account and profile information.
            </p>


            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px"
                }}
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px"
                    }}
                >

                    <User size={22} />

                    <div>

                        <strong>Name</strong>

                        <p>
                            AI Interview Platform User
                        </p>

                    </div>

                </div>


                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px"
                    }}
                >

                    <Mail size={22} />

                    <div>

                        <strong>Email</strong>

                        <p>
                            Your email will appear here
                        </p>

                    </div>

                </div>


                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px"
                    }}
                >

                    <Calendar size={22} />

                    <div>

                        <strong>Account Status</strong>

                        <p>
                            Active
                        </p>

                    </div>

                </div>

            </div>

        </div>

    </div>

);
```

}

export default Profile;
