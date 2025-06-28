import React, { useState, useEffect } from "react";
import axios from "axios";
import NotFoundPage from "../NotFound";
import AdminDashboard from "./adminDashboard";
import HrDashboard from "./hrDashboard";
import EmployeeDashboard from "./employeeDashboard";

function MainDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/current-user", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading user...</p>;

  if (!user) return <NotFoundPage />;

  if (user.role === "admin") return <AdminDashboard />;
  else if (user.role === "hr") return <HrDashboard />;
  else if (user.role === "employee") return <EmployeeDashboard />;
  else return <NotFoundPage />;
}

export default MainDashboard;
