import useAuthentication from "../../hooks/useAuthentication";
import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";
export default Navigation = (props) => {
  const { authentication } = useAuthentication();
  return (
    <nav className="main-nav">
      <ul className={style["main-nav__links"]}>
        <li>
          <NavLink to={"/profile"}>Profile</NavLink>
        </li>
        {!authentication.isAuthenticated && (
          <li>
            <NavLink to={"/login"}>Login</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
