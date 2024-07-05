import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../Config/firebase";
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Swal from "sweetalert2"
export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Swal.fire("Success", "Successfully Logged In", "success");
            console.log("User logges in Successfully!!");
            navigate("/");
        } catch (error) {
            console.log(error.message);
            Swal.fire("Error..", error.message,"error");
        }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div className="container my-5">
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input 
                    type="email" 
                    name="email"
                    className="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp"
                    value={credentials.email}
                    onChange={onChange}
                    required
                     />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input 
                    type="password" 
                    name="password"
                    className="form-control" 
                    id="exampleInputPassword1"
                    value={credentials.password}
                    onChange={onChange}
                    required
                     />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <p className="forgot-password text-right">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    )
}
