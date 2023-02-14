import React from "react";
import style from "./CartArticleList.module.css";
import { useSelector } from "react-redux";
import CartArticle from "./CartArticle";
import { selectCart } from "../../redux/slices/cartSlice";
const CartArticleList = ({ articles }) => {
  const cart = useSelector(selectCart);
  let articleList = [];
  articles.forEach((value) => {
    const { id } = value;
    const quantity = cart?.[`${id}`]?.["quantity"];
    if (quantity) {
      const { price, title, gameImages } = value;
      articleList.push(
        <li key={id}>
          <CartArticle
            id={id}
            price={price}
            title={title}
            gameImages={gameImages}
            quantity={quantity}
          ></CartArticle>
        </li>
      );
    }
  });
  return <ul className={style["article-list"]}>{articleList}</ul>;
};

export default CartArticleList;
