import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import "./login.css"
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include' // Include credentials (cookies) with request
            });
            const data = await response.json();
            if (response.ok) {
                alert("Log in successful");
                login();
            } else {
                console.log(data.message);
            }
        } catch (err) {
            console.error(err.message);
        }
    };


    return (
        <>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#loginModal">
                Login
            </button>
            <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true" data-backdrop = "false">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="loginModalLabel">Login</h4>
                            <button type="button" className="close" data-dismiss="modal"
                                onClick={() => { setUsername(""); setPassword(""); setErrorMessage(""); }}
                            >&times;</button>
                        </div>
                        <div className="modal-body">
                            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                            <form className="login-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Username: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="usernameL"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password: </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="passwordL"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button className="btn btn-primary mt-3" type="submit">Login</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal"
                                onClick={() => { setUsername(""); setPassword(""); setErrorMessage(""); }}
                            >Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;