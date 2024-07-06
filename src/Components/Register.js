import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Config/firebase";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import './auth.css'
import AnimatedPage from "./AnimatedPage";
export default function Register() {
    const [credentials, setCredentials] = useState({ Fname: "", Lname: "", Sid: "", email: "", password: "" });

    const handleRegister = async (e) => {
        e.preventDefault();

        // Extract email and password from the credentials state
        const { email, password, Fname, Lname, Sid } = credentials;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user; // Use userCredential for the user object
            console.log(user);

            if (user) {
                const db = getFirestore(auth.app);
                // Create a reference to the user document using the user ID
                const userRef = doc(db, "users", user.uid); // db is likely your Firestore instance

                await setDoc(userRef, {
                    email: user.email,
                    firstName: Fname,
                    lastName: Lname,
                    studentId: Sid,
                    userType: "user"
                });
            }
            console.log("User Registered Successfully!!");
            Swal.fire("Success", "User Registered Successfully!!", "success");
        } catch (error) {
            console.log(error.message);
            Swal.fire("Error..", error.message, "error")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <AnimatedPage>
            <div class="login-page">
                <div class="form">
                    <form className="register-form" onSubmit={handleRegister}>
                        <h3>Sign Up</h3>
                        <div className="mb-3">
                            <input
                                name="Fname"
                                type="text"
                                className="form-control"
                                placeholder="First name"
                                value={credentials.Fname}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                name="Lname"
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                                value={credentials.Lname}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                name="Sid"
                                type="text"
                                className="form-control"
                                placeholder="Student ID"
                                value={credentials.Sid}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                name="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={credentials.email}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                name="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={credentials.password}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Sign Up
                            </button>
                        </div>
                        <p className="message">
                            Already registered <Link to="/">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </AnimatedPage>
    )
}
