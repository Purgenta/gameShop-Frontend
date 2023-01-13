import { useEffect } from "react";
import { authenticatedAxios } from "../requests/axiosRequest";
import useAuthentication from "./useAuthentication";
import useRefreshToken from "./useRefreshToken";
const useAuthenticetedAxios = () => {
  const { authentication, setAuthentication } = useAuthentication();
  const refreshToken = useRefreshToken();
  const requestInterceptor = authenticatedAxios.interceptors.request.use(
    (config) => {
      if (!config?.headers["Authorization"] !== authentication.accessToken) {
        console.log("Set the header");
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
  useEffect(() => {
    const responseInterceptor = authenticatedAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousRequest = error?.config;
        if (error?.response?.status === 401 && !previousRequest.sent) {
          previousRequest.sent = true;
          const accessToken = await refreshToken();
          console.log("Is it happening");
          previousRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return authenticatedAxios(previousRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      authenticatedAxios.interceptors.response.eject(responseInterceptor);
      authenticatedAxios.interceptors.request.eject(requestInterceptor);
    };
  }, [authentication, setAuthentication, refreshToken]);
  return authenticatedAxios;
};
export default useAuthenticetedAxios;
