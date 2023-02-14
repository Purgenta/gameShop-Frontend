import React from "react";
import style from "./Checkout.module.css";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
const Checkout = ({ articles }) => {
  const cart = useSelector(selectCart);
  const totalPrice = articles.reduce((accumulator, currentValue) => {
    const { price, id } = currentValue;
    const articleQuantity = cart[`${id}`].quantity;
    return accumulator + price * articleQuantity;
  }, 0);
  return (
    <div className={style["checkout"]}>
      <h3 className={style["total-price"]}>{`${Number(totalPrice).toFixed(
        2
      )}\u20ac`}</h3>
      <Link className={style["checkout-link"]}>Checkout</Link>
    </div>
  );
};

export default Checkout;
