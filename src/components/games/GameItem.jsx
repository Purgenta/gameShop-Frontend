import React from "react";
import style from "./GameItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { addCartItem, selectCartItemCount } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
const root = `http://localhost:8080`;
const GameItem = ({ title, price, gameImages, id }) => {
  const cartItemCount = useSelector((state) => state.cart);
  console.log(cartItemCount.cart);
  const dispatch = useDispatch();
  const onCartPressed = () => {
    dispatch(addCartItem(id));
  };
  let imageUrl = `${root}${gameImages?.[0]?.["fileName"]}`;
  return (
    <div className={style["item"]}>
      <div className={style["img-wrapper"]}>
        <img src={imageUrl}></img>
      </div>
      <h4 className={style["title"]}>{title}</h4>
      <div className={style["information"]}>
        <h5 className={style["price"]}>{`${price.toFixed(2)} \u20AC `}</h5>
        <button onClick={onCartPressed} type="button" className={style["cart"]}>
          <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
};

export default GameItem;
