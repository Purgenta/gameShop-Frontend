import GameItem from "./GameItem";
import style from "./GamesList.module.css";
const GamesList = ({ games }) => {
  const gamesDisplay = games.map((value) => {
    const { title, id, price, gameImages } = value;
    return (
      <li key={id} className={style["item"]}>
        <GameItem id={id} gameImages={gameImages} price={price} title={title} />
      </li>
    );
  });
  return (
    <div>
      <ul className={style["games-list"]}>{gamesDisplay}</ul>
    </div>
  );
};

export default GamesList;
