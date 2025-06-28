// src/components/PrivateRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Option 1: check from localStorage
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
      setChecking(false);
    } else {
      // Option 2: check from server (if using session or JWT with cookie)
      axios
        .get("http://localhost:5000/api/current-user", { withCredentials: true })
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => setChecking(false));
    }
  }, []);

  if (checking) return <p>Loading...</p>;

  // If user is not present, redirect to login
  if (!user) return <Navigate to="/auth/login" />;

  return children;
};

export default PrivateRoute;
