import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './login.css'

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        formData,
        { withCredentials: true }
      );
      console.log("✅ Response from server:", response.data);

      // redirect based on role
      const role = response.data?.user?.role;
      if (role === "admin") navigate("/dashboard/admin");
      else if (role === "hr") navigate("/dashboard/hr");
      else if (role === "employee") navigate("/dashboard/employee");
      else navigate("/login");
    } catch (error) {
      console.error("❌ Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="login-box">
      <h2>Login to Hajri</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange}/>
        <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange}/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
