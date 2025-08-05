import React, { useContext } from "react"
import AuthContext from "../contexts/AuthContext"
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useContext(AuthContext)!;

    return (
        isAuthenticated ?
            children : <Navigate to={'/auth/login'} />
    )
}
