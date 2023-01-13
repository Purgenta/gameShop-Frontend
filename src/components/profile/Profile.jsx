import { useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuthenticatedAxios from "../../hooks/useAuthenticetedAxios";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../authorization/ProtectedRoute";
export default function Profile(props) {
  const axios = useAuthenticatedAxios();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const response = axios.get("user/profile");
      console.log(response.data);
    } catch (error) {
      if (error?.response?.status === 402) {
        navigate("/login");
      } else if (error?.response.status === 403) {
        navigate("/forbidden");
      }
    }
  });
  return (
    <ProtectedRoute authenticated={true} roles={[]}>
      <section className="profile">
        <h2>Welcome to your profile page</h2>
      </section>
    </ProtectedRoute>
  );
}
