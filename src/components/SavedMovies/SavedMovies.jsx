import React, { useState } from "react";
import "./savedMovies.css";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";
import api from "../../utils/Api";
import { useEffect } from "react";

export const SavedMovies = () => {
  const isLogged = React.useContext(LoggedStateContext);
  const [films1, setFilms1] = useState([]);
  const [films, setFilms] = useState([]);
  const [preloading, setPreloading] = useState(false);

  function fetchFilms() {
    api
      .getMovies()
      .then((res) => {
        console.log(res);
        setFilms(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  useEffect(() => {
    setPreloading(true);
    api
      .getMovies()
      .then((res) => {
        setFilms(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setPreloading(false);
      });
  }, []);

  useEffect(() => {
    setFilms(films);
  }, [films]);

  return (
    <section className="savedMovies">
      <SearchForm />
      <MoviesCardList
        films={films}
        type="saved"
        anotherResult=""
        isSaved={true}
        preloading={preloading}
      />
    </section>
  );
};
