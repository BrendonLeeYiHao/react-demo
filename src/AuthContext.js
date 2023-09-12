import React, {useState, useEffect, useContext} from 'react';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const value = {isLoggedIn, setIsLoggedIn};

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}