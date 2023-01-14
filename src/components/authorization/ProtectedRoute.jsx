import { Outlet, Navigate } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import { useLocation } from "react-router-dom";
export default function ProtectedRoute({ roles, authenticated }) {
  const location = useLocation();
  const { authentication } = useAuthentication();
  const isAuthenticated = authenticated && !authentication.isAuthenticated;
  const isAuthorized = !roles.includes(authentication.role) && roles.length > 0;
  if (isAuthenticated) {
    return <Navigate to={"/login"} from={location.pathname}></Navigate>;
  } else if (isAuthorized) {
    return <Navigate to={"/unauthorized"} from={location.pathname}></Navigate>;
  }
  return <Outlet></Outlet>;
}
