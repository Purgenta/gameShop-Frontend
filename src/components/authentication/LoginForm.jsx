import axios from "../../requests/axiosRequest";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import { saveToken } from "./saveToken";
import { useEffect } from "react";
import style from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import styles from "../../App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { validateEmail, validatePassword } from "./validation";
export default function LoginForm(props) {
  const { setAuthentication } = useAuthentication();
  const [error, setError] = useState("");
  const [formValidity, setFormValidity] = useState(false);
  const [email, setEmail] = useState({
    value: "",
    isValid: false,
  });
  const [password, setPassword] = useState({
    isValid: false,
    value: "",
    isFocused: false,
  });
  const navigate = useNavigate();
  useEffect(() => {
    setFormValidity(email.isValid && password.isValid);
  }, [email, password]);
  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    if (!formValidity) return;
    else {
      sendLoginData();
    }
  };
  const sendLoginData = async () => {
    try {
      const response = await axios.post(
        "authentication/login",
        JSON.stringify({
          email: email.value,
          password: password.value,
        }),
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
      saveToken(refreshToken);
      setAuthentication({
        isAuthenticated: true,
        accessToken,
        role,
      });
      navigate("/profile");
    } catch (error) {
      if (!error?.response) setError("No response from the server");
      else if (error.response?.status === 400) {
        setError("Unsuccessful login attempt");
      }
    }
  };
  return (
    <div className={style["form-container"]}>
      {error && <p className={styles["error-message"]}>{error}</p>}
      <form onSubmit={onFormSubmitHandler} className={style["login-form"]}>
        <div className="form-group">
          <label htmlFor="email" className="input-label">
            Email:
          </label>
          <input
            onChange={(event) => {
              setEmail({
                value: event.target.value,
                isValid: validateEmail(event.target.value),
              });
            }}
            id="email"
            type={"email"}
            className={style["authentication-input"]}
            placeholder="Email"
            autoComplete="current-email"
            value={email.value}
            required
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="input-label">
            {"Password:"}
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            onChange={(event) => {
              setPassword({
                ...password,
                isValid: validatePassword(event.target.value),
                value: event.target.value,
              });
            }}
            onFocus={() => {
              setPassword({
                ...password,
                isFocused: true,
              });
            }}
            onBlur={() => {
              setPassword({
                ...password,
                isFocused: false,
              });
            }}
            value={password.value}
            placeholder="Password"
            aria-describedby="aria-description-password"
          />
          {password.isFocused && (
            <p id="aria-description-password" className="aria-description">
              <FontAwesomeIcon icon={faInfoCircle}> </FontAwesomeIcon>
              <span>
                Your password must be between 5-16 characters, no special
                characters only uppercase/lower case and numbers
              </span>
            </p>
          )}
        </div>
        <div className={styles["form-controls"]}>
          <button
            type="submit"
            className={styles["button-default"]}
            disabled={!formValidity}
          >
            Submit
          </button>
        </div>
        <Link className="form-link" to={"/register"}>
          Don't have an account? Sign up!
        </Link>
      </form>
    </div>
  );
}
