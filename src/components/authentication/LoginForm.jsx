import axios from "../../requests/axiosRequest";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
export default function LoginForm(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const location = useLocation();
  console.log(location);
  const { setAuthentication } = useAuthentication();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onFormSubmitHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await axios.post(
        "authentication/login",
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
      localStorage.setItem("refreshToken", refreshToken);
      setAuthentication({
        isAuthenticated: true,
        accessToken,
        role,
      });
      navigate("/profile");
    } catch (error) {
      if (!error?.response) setError("No response from the server");
      else if (error.response?.status === 400) {
      }
    }
  };
  return (
    <div className="login-form__wrapper">
      <form>
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
      </form>
    </div>
  );
}
