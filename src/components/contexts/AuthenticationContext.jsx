import { createContext, useState } from "react";
const AuthenticationContext = createContext({});
export function AuthenticationContextProvider({ children }) {
  const [authentication, setAuthentication] = useState({
    accessToken: "",
    isAuthenticated: false,
    role: "",
  });
  return (
    <AuthenticationContext.Provider
      value={{ authentication, setAuthentication }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
export default AuthenticationContext;
