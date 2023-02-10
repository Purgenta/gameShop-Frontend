import { Routes, Route } from "react-router-dom";
import { Suspense, useState, lazy } from "react";
import ReactDOM from "react-dom";
import Navigation from "./components/navigation/Navigation";
import { store } from "./redux/store";
import { Provider } from "react-redux";
const mainHeader = document.querySelector("#main-header");
const ProtectedRoute = lazy(() => {
  return import("./components/authorization/ProtectedRoute");
});
const Profile = lazy(() => {
  return import("./components/profile/Profile");
});
const GameSearch = lazy(() => {
  return import("./components/games/GameSearch");
});
const UnathorizedAccess = lazy(() => {
  return import("./components/authorization/UnauthorizedAccess");
});
const LoginForm = lazy(() => {
  return import("./components/authentication/LoginForm");
});
export default function App() {
  return (
    <>
      <Provider store={store}>
        <Suspense fallback={<div className="loading">Loading ...</div>}>
          {ReactDOM.createPortal(<Navigation />, mainHeader)}
          <Routes>
            <Route
              path="/searchGames"
              element={<GameSearch></GameSearch>}
            ></Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/unauthorized" element={<UnathorizedAccess />} />
            <Route element={<ProtectedRoute authenticated={true} roles={[]} />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </Suspense>
      </Provider>
    </>
  );
}
