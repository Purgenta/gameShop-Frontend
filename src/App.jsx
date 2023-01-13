import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/authentication/LoginForm";
import Profile from "./components/profile/Profile";
import UnathorizedAccess from "./components/authorization/UnauthorizedAccess";
import AuthenticationContext from "./components/contexts/AuthenticationContext";
import { useState } from "react";
import ProtectedRoute from "./components/authorization/ProtectedRoute";
export default function App() {
  const [authentication, setAuthentication] = useState({
    accessToken: "",
    isAuthenticated: false,
    role: "",
  });
  return (
    <div className="App">
      <AuthenticationContext.Provider
        value={{ authentication, setAuthentication }}
      >
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/unauthorized" element={<UnathorizedAccess />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthenticationContext.Provider>
    </div>
  );
}
