import AuthenticationContext from "../components/contexts/AuthenticationContext";
import { useContext } from "react";
export default function useAuthentication() {
  return useContext(AuthenticationContext);
}
