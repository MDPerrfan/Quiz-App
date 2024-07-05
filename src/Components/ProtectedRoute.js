// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../Config/firebase";

function ProtectedRoute({ element, ...rest }) {
  const user = auth.currentUser; // Get the current user from Firebase auth

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/" replace />;
  }

  // If the user is logged in, render the requested component
  return element;
}

export default ProtectedRoute;
