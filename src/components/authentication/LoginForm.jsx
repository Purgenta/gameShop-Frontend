import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import AuthenticationContext from "../contexts/AuthenticationContext";
export default function LoginForm(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const authentication = useContext(AuthenticationContext);
  const { authenticationProperties, setAuthentication } = authentication;
  const [error, setError] = useState("");
  const onFormSubmitHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await axios.post(
        "http://localhost:8080/authentication/login",
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const {
        data: { accessToken },
        data: { refreshToken },
        data: { role },
      } = response;
      setAuthentication({
        isAuthenticated: true,
        accessToken,
        role,
      });
    } catch (error) {
      console.log(error);
      if (!error?.response) setError("No response from the server");
      else if (error.response?.status === 400) {
      }
    }
  };
  return (
    <div className="login-form__wrapper">
      <label htmlFor="email">{"Email:"}</label>
      <input
        ref={emailRef}
        id="email"
        type={"email"}
        placeholder="Email"
        required
        name="email"
      />
      <label htmlFor="password">{"Password:"}</label>
      <input
        id="password"
        type="password"
        ref={passwordRef}
        placeholder="Password"
      />
      <button
        className="submit-button"
        disabled={false}
        onClick={onFormSubmitHandler}
      >
        Submit
      </button>
    </div>
  );
}
