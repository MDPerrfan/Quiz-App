import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home/Home";
import { auth } from "./Config/firebase";
import ProtectedRoute from "./Components/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={<ProtectedRoute element={<Home />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
