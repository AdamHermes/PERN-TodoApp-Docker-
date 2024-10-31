import React, { useContext } from 'react';
import './App.css';
import { AuthContext } from './components/AuthContext.js';
import InputTodo from "./components/InputTodo.js"
import ListTodos from "./components/ListTodos.js"
import Register from "./components/Register.js"
import Login from "./components/Login.js"
import Logout from "./components/Logout.js"

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="container">
      {/* Conditionally render Login/Register or Input/List */}
      {isLoggedIn ? (
        <>
          <InputTodo />
          <Logout />
          <ListTodos />
        </>
      ) : (
        <div className="auth-buttons">
          <Register />
          <Login />
        </div>
      )}
    </div>
  );
}

export default App;
