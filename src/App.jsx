import "./App.css";
import { AuthenticationContextProvider } from "./components/contexts/AuthenticationContext";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/authentication/LoginForm";
import Profile from "./components/profile/Profile";
export default function App() {
  return (
    <div className="App">
      <AuthenticationContextProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </AuthenticationContextProvider>
    </div>
  );
}
