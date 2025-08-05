import React, { useContext } from "react"
import AuthContext from "../contexts/AuthContext"
import { Navigate } from "react-router-dom";

export const PreAuthRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useContext(AuthContext)!;

    return (
        isAuthenticated ?
            <Navigate to={'/'} /> : children
    )
}
