import React, { createContext, useState } from 'react'
export const AuthContextF = createContext();

const AuthContext = ({ children }) => {
    
    const [isAuth, setIsAuth] = React.useState(false)
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