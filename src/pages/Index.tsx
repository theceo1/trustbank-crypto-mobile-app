
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Home from "@/pages/Home";

// Main entry point that routes based on authentication status
const Index = () => {
  const { user, isLoading } = useAuth();

  // While authentication is loading, return null
  if (isLoading) {
    return null;
  }

  // If user is logged in, show home page
  // If not, redirect to login
  return user ? <Home /> : <Navigate to="/login" />;
};

export default Index;
