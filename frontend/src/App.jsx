import { Routes, Route } from "react-router-dom";
import Login from "./Authentication/login";
import MainDashboard from "./dashboard/mainDashboard";
import NotFoundPage from "./NotFound";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <MainDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={
          <PrivateRoute>
            <NotFoundPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
