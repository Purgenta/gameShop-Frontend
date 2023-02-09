import { Routes, Route } from "react-router-dom";
import AuthenticationContext from "./components/contexts/AuthenticationContext";
import { Suspense, useState, lazy } from "react";
import ReactDOM from "react-dom";
import Navigation from "./components/navigation/Navigation";
import Filter from "./components/filter/Filter";
const mainHeader = document.querySelector("#main-header");
const ProtectedRoute = lazy(() => {
  return import("./components/authorization/ProtectedRoute");
});
const Profile = lazy(() => {
  return import("./components/profile/Profile");
});
const UnathorizedAccess = lazy(() => {
  return import("./components/authorization/UnauthorizedAccess");
});
const LoginForm = lazy(() => {
  return import("./components/authentication/LoginForm");
});
export default function App() {
  const [authentication, setAuthentication] = useState({
    accessToken: "",
    isAuthenticated: false,
    role: "",
  });
  return (
    <>
      <Filter></Filter>
      <AuthenticationContext.Provider
        value={{ authentication, setAuthentication }}
      >
        <Suspense fallback={<div className="loading">Loading ...</div>}>
          {ReactDOM.createPortal(<Navigation />, mainHeader)}
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/unauthorized" element={<UnathorizedAccess />} />
            <Route
              element={
                <ProtectedRoute authenticated={true} roles={["ROLE_USER"]} />
              }
            >
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthenticationContext.Provider>
    </>
  );
}
