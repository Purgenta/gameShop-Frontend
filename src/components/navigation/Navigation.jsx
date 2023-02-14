import { useSelector } from "react-redux";
import { authenticationSelector } from "../../redux/slices/authenticationSlice";
import { NavLink } from "react-router-dom";
import logoImg from "../../assets/g2a.svg";
import { selectCartItemCount } from "../../redux/slices/cartSlice";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./searchbar/SearchBar";
import style from "./Navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserActions from "./useractions/UserActions";
export default Navigation = (props) => {
  const authentication = useSelector(authenticationSelector);
  const itemCount = useSelector(selectCartItemCount);
  return (
    <nav className={style["main-nav"]}>
      <div className={style["logo"]}>
        <img src={logoImg} alt="shop-logo" />
      </div>
      <SearchBar></SearchBar>
      <div className={style["user-interactions"]}>
        <UserActions></UserActions>
        <NavLink to={"/cart"} className={style["cart"]}>
          <span className={style["cart-count"]}>{itemCount}</span>
          <FontAwesomeIcon
            className={style["cart-badge"]}
            size="lg"
            icon={faCartShopping}
          ></FontAwesomeIcon>
        </NavLink>
      </div>
    </nav>
  );
};
