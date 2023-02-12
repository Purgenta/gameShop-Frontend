import { useSelector } from "react-redux";
import { authenticationSelector } from "../../redux/slices/authenticationSlice";
import { NavLink } from "react-router-dom";
import logoImg from "../../assets/g2a.svg";
import { selectCartItemCount } from "../../redux/slices/cartSlice";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./searchbar/SearchBar";
import style from "./Navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <NavLink className={"user"}>
          <FontAwesomeIcon size="lg" icon={faUser}></FontAwesomeIcon>
        </NavLink>
        <NavLink className={style["cart"]}>
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
