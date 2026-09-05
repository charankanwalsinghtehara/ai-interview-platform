import {

createContext,
useContext,
useState


} from "react";

const AuthContext =
createContext(null);

export function AuthProvider({
children
}) {


const getStoredUser = () => {

    try {

        const storedUser =
            localStorage.getItem("user");


        return storedUser
            ? JSON.parse(storedUser)
            : null;

    }

    catch {

        return null;

    }

};


const getStoredToken = () => {

    return localStorage.getItem(
        "access_token"
    );

};


const [user, setUser] =
    useState(getStoredUser);


const [accessToken, setAccessToken] =
    useState(getStoredToken);


const login = (
    userData,
    newAccessToken,
    refreshToken
) => {

    if (newAccessToken) {

        localStorage.setItem(
            "access_token",
            newAccessToken
        );

        setAccessToken(
            newAccessToken
        );

    }


    if (refreshToken) {

        localStorage.setItem(
            "refresh_token",
            refreshToken
        );

    }


    const userToStore =
        userData || {
            username: "Candidate"
        };


    localStorage.setItem(
        "user",
        JSON.stringify(userToStore)
    );


    setUser(userToStore);

};


const logout = () => {

    localStorage.removeItem(
        "access_token"
    );

    localStorage.removeItem(
        "refresh_token"
    );

    localStorage.removeItem(
        "user"
    );


    setAccessToken(null);

    setUser(null);

};


const isAuthenticated =
    Boolean(accessToken);


return (

    <AuthContext.Provider

        value={{

            user,

            isAuthenticated,

            login,

            logout

        }}

    >

        {children}

    </AuthContext.Provider>

);


}

export function useAuth() {


const context =
    useContext(AuthContext);


if (!context) {

    throw new Error(
        "useAuth must be used inside AuthProvider"
    );

}


return context;


}
