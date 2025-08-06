import React, { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'

export const ProtectedDiv = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useContext(AuthContext)!;
    return (
        isAuthenticated ? children : null
    )
}
