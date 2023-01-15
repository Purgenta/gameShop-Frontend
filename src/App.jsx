import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthenticationContext from "./components/contexts/AuthenticationContext";
import { Suspense, useState, lazy } from "react";
import ReactDOM from "react-dom";
import Navigation from "./components/navigation/Navigation";
const mainHeader = document.querySelector("#main-header");
export default function App() {
  const ProtectedRoute = lazy(() => {
    import("./components/authorization/ProtectedRoute");
  });
  const Profile = lazy(() => {
    import("./components/profile/Profile");
  });
  const UnathorizedAccess = lazy(() => {
    import("./components/authorization/UnauthorizedAccess");
  });
  const LoginForm = lazy(() => {
    import("./components/authentication/LoginForm");
  });
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
        <Suspense
          fallback={<div className="loading">Loading ...</div>}
        ></Suspense>
        {ReactDOM.createPortal(<Navigation />, mainHeader)}
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/unauthorized" element={<UnathorizedAccess />} />
          <Route element={<ProtectedRoute authenticated={true} roles={[]} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthenticationContext.Provider>
    </div>
  );
}
