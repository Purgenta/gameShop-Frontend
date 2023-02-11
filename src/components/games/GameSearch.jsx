import React, { useEffect, useState } from "react";
import style from "./GameSearch.module.css";
import Filter from "../filter/Filter";
import GamesList from "./GamesList";
import { useParams } from "react-router-dom";
import axiosRequest from "../../requests/axiosRequest";
const baseUrl = `games/getGames`;
const GameSearch = () => {
  const { title } = useParams();
  const [url, setUrl] = useState(baseUrl);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const onFilterChange = (url) => {
    setUrl(url);
  };
  useEffect(() => {
    const getGamesData = async () => {
      try {
        const response = await axiosRequest.get(url);
        setData(response.data);
      } catch (error) {
        setError(`Error processing your request`);
      }
    };
    getGamesData();
  }, [url]);
  return (
    <section className={style["game-search"]}>
      <h2>Search games</h2>
      <div className={style["list-filter__wrapper"]}>
        <Filter onChange={onFilterChange} className={style["filter"]}></Filter>
        {data && (
          <GamesList
            games={data.games}
            pagination={data.pagination}
          ></GamesList>
        )}
      </div>
    </section>
  );
};

export default GameSearch;
