import React, { createContext, useState } from 'react'
export const AuthContextF = createContext();

const AuthContext = ({ children }) => {
    const userToken = JSON.parse(localStorage.getItem("jwtToken")) || false
    const [isAuth, setIsAuth] = React.useState(userToken)

    const handleAuth = (value) => {
        setIsAuth(value)
    }
    return (
        <AuthContext.Provider value={{ isAuth, handleAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext