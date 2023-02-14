import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./UserActions.module.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { authenticationSelector } from "../../../redux/slices/authenticationSlice";
import { useSelector } from "react-redux";
const UserActions = (props) => {
  const [active, setActive] = useState(false);
  const { isAuthenticated, role } = useSelector(authenticationSelector);
  const onHover = () => setActive((prev) => !prev);
  return (
    <button
      onMouseEnter={onHover}
      onClick={() => setActive(true)}
      onMouseLeave={onHover}
      aria-label="user-actions"
      className={style["user"]}
    >
      <FontAwesomeIcon size="lg" icon={faUser}></FontAwesomeIcon>
      <ul
        className={`${style["user-actions"]} ${
          active ? "shown" : style["hidden"]
        }`}
      >
        {isAuthenticated ? (
          <>
            <li>
              <NavLink>Profile</NavLink>
            </li>
            <li>
              <NavLink>Logout</NavLink>
            </li>
            {role == "ROLE_ADMIN" && (
              <li>
                <NavLink>Admin dashboard</NavLink>
              </li>
            )}
          </>
        ) : (
          <>
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </button>
  );
};
export default UserActions;
