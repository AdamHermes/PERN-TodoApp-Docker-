import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Logout = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/logout", {
                method: 'POST',
                credentials: 'include' // Include credentials (cookies) with request
            });
            if (response.ok) {
                logout(); // Update authentication state
            } else {
                console.log("Logout failed");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
