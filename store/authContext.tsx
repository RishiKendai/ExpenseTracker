import React, { ReactNode, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthContextType = {
    token: string | null,
    isAuthenticated: boolean,
    authenticate: Function,
    logout: Function,
};

export const AuthContext = createContext<AuthContextType>({
    token: '',
    isAuthenticated: false,
    authenticate: (token: string) => { },
    logout: () => { },
});

function AuthContextProvider({ children }: { children: ReactNode }) {

    const [authToken, setAuthToken] = useState<string| null>(null);

    function authenticate(token: string) {
        AsyncStorage.setItem('token', token);
        setAuthToken(token);
    }

    function logout() {
        setAuthToken('');
        AsyncStorage.removeItem('token');
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={ value }>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;