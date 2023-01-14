import { useEffect } from "react";
import { authenticatedAxios } from "../requests/axiosRequest";
import useAuthentication from "./useAuthentication";
import useRefreshToken from "./useRefreshToken";
const useAuthenticetedAxios = () => {
  const { authentication } = useAuthentication();
  const refreshToken = useRefreshToken();
  useEffect(() => {
    const requestInterceptor = authenticatedAxios.interceptors.request.use(
      (config) => {
        if (!config?.headers["Authorization"]) {
          config.headers[
            "Authorization"
          ] = `Bearer ${authentication.accessToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    const responseInterceptor = authenticatedAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousRequest = error?.config;
        if (error?.response?.status === 401 && !previousRequest.sent) {
          previousRequest.sent = true;
          const accessToken = await refreshToken();
          previousRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          console.log(previousRequest);
          return authenticatedAxios(previousRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      authenticatedAxios.interceptors.response.eject(responseInterceptor);
      authenticatedAxios.interceptors.request.eject(requestInterceptor);
    };
  }, [authentication, refreshToken]);
  return authenticatedAxios;
};
export default useAuthenticetedAxios;
