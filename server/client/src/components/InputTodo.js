import React, { useState, useContext } from "react";
import {AuthContext} from './AuthContext.js'
const InputTodo = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [description, setDescription] = useState("");

    const OnSubmitForm = async e => {
        e.preventDefault();
        try {   
            console.log("Adding new Todos");
            const body = { description };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: 'include' // Include credentials to send session cookies
            });
            if (response.ok) {
                console.log("Todo added successfully");
                window.location = "/"; 
            } else {
                console.error("Failed to add todo");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            {isLoggedIn && ( // Render the form only if user is logged in
                <>
                    
                    <h1 className="text-center mt-5">Todo List</h1>
                    <form className="d-flex mt-5" onSubmit={OnSubmitForm}>
                        <input
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button className="btn btn-success">Add</button>
                    </form>
                </>
            )}
        </>
    );
};

export default InputTodo;
