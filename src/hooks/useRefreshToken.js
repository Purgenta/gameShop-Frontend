import { getToken } from "../components/authentication/saveToken";
import axios from "../requests/axiosRequest";
import { updateAuthentication } from "../redux/slices/authenticationSlice";
const useRefreshToken = () => {
  const refreshToken = getToken();
  const getAccessToken = async () => {
    const bearer = `Bearer ${refreshToken}`;
    const response = await axios.get("/authentication/refreshToken", {
      headers: {
        Authorization: bearer,
      },
    });
    const {
      data: { accessToken },
      data: { role },
    } = response;
    updateAuthentication({ accessToken, role, isAuthenticated: true });
    return response.data.accessToken;
  };
  return getAccessToken;
};
export default useRefreshToken;
