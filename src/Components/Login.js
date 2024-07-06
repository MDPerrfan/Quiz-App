import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../Config/firebase";
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Swal from "sweetalert2"
import AnimatedPage from "./AnimatedPage";
import './auth.css';
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
            Swal.fire("Error..", error.message, "error");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <AnimatedPage>
        <div class="login-page">
            <div class="form">
                <form className="login-form" onSubmit={handleLogin}>
                    <header class="head-form">
                        <h2>Log In</h2>
                        <p>login here using your email and password</p>
                    </header>
                    <div className="mb-3">
                        {/*                     <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
 */}                    <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="email"
                            value={credentials.email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        {/*                     <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
 */}                    <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="password"
                            value={credentials.password}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <p className="message">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </form>
            </div>
        </div>
        </AnimatedPage>
    )
}
