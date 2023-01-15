import useAuthentication from "../../hooks/useAuthentication";
import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";
export default Navigation = (props) => {
  const { authentication } = useAuthentication();
  return (
    <nav className={style["main-nav"]}>
      <ul className={style["main-nav__links"]}>
        <li>
          <NavLink to={"/home"} className={style["main-nav__link"]}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/profile"} className={style["main-nav__link"]}>
            Profile
          </NavLink>
        </li>
        {!authentication.isAuthenticated && (
          <li>
            <NavLink to={"/login"} className={style["main-nav__link"]}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
