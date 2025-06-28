import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true, // required for sending cookies
      });

      // Clear any frontend storage (if used)
      localStorage.removeItem("user");

      // Redirect to login page
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
      Logout
    </button>
  );
}

export default LogoutButton;
