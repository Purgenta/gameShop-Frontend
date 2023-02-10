import GameItem from "./GameItem";
import style from "./GamesList.module.css";
const GamesList = ({ games }) => {
  const gamesDisplay = games.map((value) => {
    const { title, id, price, gameImages } = value;
    return (
      <GameItem gameImages={gameImages} key={id} price={price} title={title} />
    );
  });
  return (
    <div>
      <ul className={style["games-list"]}>{gamesDisplay}</ul>
    </div>
  );
};

export default GamesList;
