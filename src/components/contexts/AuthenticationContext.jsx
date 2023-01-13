import { createContext } from "react";
const AuthenticationContext = createContext({
  authentication: {
    accessToken: "",
    isAuthenticated: false,
    role: "",
  },
  setAuthentication: () => {},
});
export default AuthenticationContext;
