import React from "react";
import style from "./GameItem.module.css";
const root = `http://localhost:8080`;
const GameItem = ({ title, price, gameImages }) => {
  let imageUrl = `${root}${gameImages?.[0]?.["fileName"]}`;
  return (
    <li className={style["game-item"]}>
      <div className={style["img-wrapper"]}>
        <img src={imageUrl}></img>
      </div>
      <h4 className={style["game-title"]}>{title}</h4>
      <h5 className={style["price"]}>{price}</h5>
    </li>
  );
};

export default GameItem;
