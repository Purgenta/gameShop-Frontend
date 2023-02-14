import { Outlet, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { authenticationSelector } from "../../redux/slices/authenticationSlice";
import { useSelector } from "react-redux";
export default function ProtectedRoute({ roles, authenticated }) {
  const location = useLocation();
  const authentication = useSelector(authenticationSelector);
  console.log(authentication);
  const isAuthenticated = authenticated && !authentication.isAuthenticated;
  const isAuthorized = roles.length > 0 && !roles.includes(authentication.role);
  if (isAuthenticated) {
    return <Navigate to={"/login"} from={location.pathname}></Navigate>;
  } else if (isAuthorized) {
    return <Navigate to={"/unauthorized"} from={location.pathname}></Navigate>;
  }
  return <Outlet></Outlet>;
}
