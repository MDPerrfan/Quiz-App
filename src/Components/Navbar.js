import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../Config/firebase'; // Import Firebase auth

export default function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/login');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        TakeQuiz
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {user ? (
                            <button className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>
                        ) : (
                            <form className="d-flex">
                                <Link className="btn btn-outline-primary mx-2" to="/login" role="button">Login</Link>
                                <Link className="btn btn-outline-info mx-2" to="/register" role="button">Signup</Link>
                            </form>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
