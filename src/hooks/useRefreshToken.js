import { getToken } from "../components/authentication/saveToken";
import axios from "../requests/axiosRequest";
import useAuthentication from "./useAuthentication";
const useRefreshToken = () => {
  const { setAuthentication } = useAuthentication();
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
    setAuthentication((prev) => {
      return {
        ...prev,
        accessToken,
        role,
      };
    });
    return response.data.accessToken;
  };
  return getAccessToken;
};
export default useRefreshToken;
