import {

    createContext,
    useContext,
    useState

} from "react";


const AuthContext =
    createContext();


export function AuthProvider({
    children
}) {


    const getStoredUser = () => {

        const storedUser =
            localStorage.getItem("user");


        if (!storedUser) {

            return null;

        }


        try {

            return JSON.parse(storedUser);

        }

        catch {

            return null;

        }

    };


    const [user, setUser] =
        useState(getStoredUser);


    const login = (
        userData,
        accessToken,
        refreshToken
    ) => {

        if (accessToken) {

            localStorage.setItem(
                "access_token",
                accessToken
            );

        }


        if (refreshToken) {

            localStorage.setItem(
                "refresh_token",
                refreshToken
            );

        }


        if (userData) {

            localStorage.setItem(
                "user",
                JSON.stringify(userData)
            );

        }


        setUser(userData);

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


        setUser(null);

    };


    const isAuthenticated =
        !!localStorage.getItem(
            "access_token"
        );


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

    return useContext(AuthContext);

}