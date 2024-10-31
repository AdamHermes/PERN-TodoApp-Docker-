import React, {useState} from "react"
import './login.css'
const Register = () =>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [confirmedPassword,setConfirmedPassword] = useState("");
    const [message,setMessage] = useState("")
    const handleSubmit = async e =>{
        e.preventDefault();
        if (password != confirmedPassword){
            setMessage("Passwords do not match");
            return;
        }
        const user = {username,password}
        try{
            const body = {username,password}
            const response = await fetch("http://localhost:5000/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            window.location = "/";
            if (response.ok) {
                setMessage("Registration successful!");
                alert("Registration Successfully");
                // You can also redirect the user to another page here if needed
            } else {
                setMessage("Registration failed!");
            }
        }
        catch(err){
            console.error(err.message);
        }
    }
    return (
        <>
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#registerModal">
            Register
          </button>
          <div className="modal fade" id="registerModal" tabIndex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
    
                <div className="modal-header">
                  <h4 className="modal-title" id="registerModalLabel">Register</h4>
                  <button type="button" className="close" data-dismiss="modal"
                    onClick={() => { setUsername(""); setPassword(""); setConfirmedPassword(""); }}
                  >&times;</button>
                </div>
    
                <div className="modal-body">
                  <form className="Register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="username">Username: </label>
                      <input
                        type="text"
                        className="form-control"
                        id="usernameR"
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
                        id="passwordR"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmedPassword">Confirmed Password: </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmedPassword"
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button className="btn btn-primary mt-3" type="submit">Register</button>
                  </form>
                </div>
    
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-dismiss="modal"
                    onClick={() => { setUsername(""); setPassword(""); setConfirmedPassword(""); }}
                  >Close</button>
                </div>
    
              </div>
            </div>
          </div>
        </>
      );
    };
export default Register