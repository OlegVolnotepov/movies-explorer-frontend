import React from "react";
import { useEffect } from "react";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import "./movies.css";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";
import moviesApi from "../../utils/MoviesApi";
import { useState } from "react";

export const Movies = () => {
  const isLogged = React.useContext(LoggedStateContext);
  const [preloading, setPreloading] = useState(false);
  const [films, setFilms] = useState([]);

  function findMovies(movies, searchValue) {
    //setFilms(movies.filter((item) => item.nameRU.indexOf(searchValue) !== -1));

    console.log(
      movies.filter((item) => item.nameRu.indexOf(searchValue) !== -1)
    );
    // return console.log(
    //   movies.filter((item) => item.nameRU.indexOf(searchValue) !== -1)
    // );
  }

  const testArray = [
    { nameRu: "рифмы и слоги" },
    { nameRu: "толпа для павидла" },
  ];

  function getMovies(searchValue) {
    setPreloading(true);
    moviesApi
      .getAllMovies()
      .then((data) => {
        findMovies(data, searchValue);
        console.log(films);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setPreloading(false));
  }
  // useEffect(() => {
  //   getMovies();
  // }, []);

  useEffect(() => {
    isLogged.setIsLogged(true);
  }, []);

  return (
    <>
      <button onClick={() => findMovies(testArray, "иф")}>Button</button>
      <section className="movies">
        <SearchForm getMovies={getMovies} />
        <MoviesCardList preloading={preloading} />
      </section>
    </>
  );
};
