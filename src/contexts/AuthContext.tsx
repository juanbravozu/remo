import React, { FC, useContext, useEffect, useState } from 'react';
import { auth } from '../utils/firebase';

type authContextType = {
    currentUser: any;
    signup: (email: string, password: string) => any;
}

const AuthContext = React.createContext<authContextType | undefined>(undefined);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider:FC = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState<any>();
    const [ loading, setLoading ] = useState(true);
 
    function signup(email:string, password:string) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email:string, password:string) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}