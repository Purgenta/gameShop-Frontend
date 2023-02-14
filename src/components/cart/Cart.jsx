import React, { useEffect } from "react";
import style from "./Cart.module.css";
import { useSelector } from "react-redux";
import { selectCart, selectCartItemCount } from "../../redux/slices/cartSlice";
import useRequestState from "../../hooks/useRequestState";
import CartArticleList from "./CartArticleList";
import Checkout from "./Checkout";
import axiosRequest from "../../requests/axiosRequest";
const Cart = () => {
  const { data, setIsLoading, loading, setData, error, setError } =
    useRequestState();
  const cart = useSelector(selectCart);
  const cartAmount = useSelector(selectCartItemCount);
  useEffect(() => {
    const getCartData = async () => {
      setIsLoading(true);
      try {
        const cartItemList = [];
        for (const [, cartItem] of Object.entries(cart)) {
          cartItemList.push(cartItem);
        }
        const response = await axiosRequest.post(
          `cart/items`,
          JSON.stringify({ cart: cartItemList }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    if (cartAmount) {
      getCartData();
    }
  }, []);
  return (
    <div className={style["cart"]}>
      <section className={style["cart-items"]}>
        {data && <CartArticleList articles={data.games} />}
      </section>
      <section className={style["checkout"]}>
        {data && <Checkout articles={data.games} />}
      </section>
    </div>
  );
};

export default Cart;
