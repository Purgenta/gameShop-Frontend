import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../contexts/AuthenticationContext";
export default function ProtectedRoute({ children, roles }) {
  const navigate = useNavigate();
  const authenticationContext = useContext(AuthenticationContext);
  console.log(authenticationContext);
  const { authentication: role, authentication: isAuthenticated } =
    authenticationContext;
  if (!roles.includes(role)) {
    console.log("running ");
    navigate("/forbidden");
  } else if (!isAuthenticated) {
    console.log("isn't authenticated");
    navigate("/unauthorized");
  }
  return <>{children}</>;
}
