import React from "react";
import style from "./CartArticle.module.css";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  saveCart,
  updateQuantity,
} from "../../redux/slices/cartSlice";
const CartArticle = ({ id, price, title, gameImages, quantity }) => {
  const root = `http://localhost:8080`;
  const totalPrice = quantity * price;
  const dispatch = useDispatch();
  const storeCart = () => dispatch(saveCart());
  const onIncrement = () => {
    dispatch(updateQuantity(id, 1));
    storeCart();
  };
  const onDecrement = () => {
    dispatch(updateQuantity(id, -1));
    storeCart();
  };
  const onRemove = () => {
    dispatch(removeCartItem(id));
    storeCart();
  };
  return (
    <article className={style["cart-article"]}>
      <div className={style["article-image"]}>
        <img src={`${root}${gameImages?.[0].fileName}`} />
      </div>
      <h3 className={style["title"]}>{title}</h3>
      <div className={style["quantity-modifier"]}>
        <button
          onClick={onDecrement}
          type="button"
          aria-label="decrement quantity"
        >
          -
        </button>
        <h4 className={style["quantity"]}>{quantity}</h4>
        <button
          onClick={onIncrement}
          type="button"
          aria-label="increment quantity"
        >
          +
        </button>
      </div>
      <h3 className={style["total-price"]}>{`${Number(totalPrice).toFixed(
        2
      )}\u20AC`}</h3>
      <button
        onClick={onRemove}
        className={style["remove-product"]}
        aria-label="remove-product"
      >
        X
      </button>
    </article>
  );
};

export default CartArticle;
