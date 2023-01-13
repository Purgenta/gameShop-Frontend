import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
export default function ProtectedRoute({ children, roles, authenticated }) {
  const navigate = useNavigate();
  const { authentication } = useAuthentication();
  useEffect(() => {
    if (authenticated && !authentication.isAuthenticated) navigate("/login");
    else if (roles.length > 0 && !roles.includes(authentication.role))
      navigate("/unauthorized");
  }, [authenticated, roles, authentication]);

  return <>{children}</>;
}
