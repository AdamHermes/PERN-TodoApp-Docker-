import React, { createContext, useState, useEffect } from 'react';

// Create a context for authentication
export const AuthContext = createContext();

// Create a  provider component
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username,setUsername] = useState('');
    // Check if the user is already logged in when the component mounts
    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        const storedUsername = localStorage.getItem('username');

        if (storedIsLoggedIn === 'true' && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }
    }, []);

    const login = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username',username);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUsername('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
