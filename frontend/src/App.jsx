import { Routes, Route } from "react-router-dom";
import Login from "./Authentication/login";
import MainDashboard from "./dashboard/mainDashboard";
import NotFoundPage from "./NotFound";


function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/dashboard" element={<MainDashboard />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>


  );
}

export default App;
