import React, { useState } from "react";
import "./savedMovies.css";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";
import api from "../../utils/Api";
import { useEffect } from "react";

export const SavedMovies = ({ checkResponse }) => {
  const isLogged = React.useContext(LoggedStateContext);
  const [films, setFilms] = useState([]);
  const [preloading, setPreloading] = useState(false);
  const [anotherResult, setAnotherResult] = useState("");
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [shortFilms, setShortFilms] = useState([]);
  const [filmsStorage, setFilmsStorage] = useState([]); // все загруженные фильмы

  const handleClearSearch = () => {
    setFilms(filmsStorage);
  };

  function handleDeleteMovie(film) {
    setPreloading(true);
    api
      .deleteMovie(film._id)
      .then((res) => {
        films.map((item, index) => {
          //const newEl = res.filter((e) => e._id === item._id);
          if (res._id == item._id) {
            films.splice(index, 1);
          }
        });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setPreloading(false);
      });
  }

  function searchFilms(requset) {
    filmsStorage.map((item) => {
      if (item.nameRU.toLowerCase().includes(requset.toLowerCase())) {
        setFilms([item]);
      }
    });
  }

  function handleChangeShortFilmsInSaved() {
    if (localStorage.getItem("shortSaved") === "true") {
      localStorage.setItem("shortSaved", false);
      setIsShortFilm(!isShortFilm);
    } else {
      localStorage.setItem("shortSaved", true);
      setIsShortFilm(!isShortFilm);
    }
  }

  useEffect(() => {
    setPreloading(true);
    api
      .getMovies()
      .then((res) => {
        setFilmsStorage(res);
        if (films.length > 0) {
          setShortFilms(res.filter((item) => item.duration < 41));
        }
        if (res.length && res.length > 0) {
          setAnotherResult("");
        } else {
          setAnotherResult("savedPage");
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setPreloading(false);
      });
  }, []);

  useEffect(() => {
    if (filmsStorage.length > 0) {
      setShortFilms(filmsStorage.filter((item) => item.duration < 41));
    }
  }, [filmsStorage]);

  useEffect(() => {
    if (localStorage.getItem("shortSaved") === "true") {
      setIsShortFilm(true);
    } else {
      setIsShortFilm(false);
    }
  });

  useEffect(() => {
    if (isShortFilm) {
      setFilms(shortFilms);
    } else {
      setFilms(filmsStorage);
    }
  }, [filmsStorage, isShortFilm, shortFilms]);

  return (
    <section className="savedMovies">
      <SearchForm
        path={"saved"}
        handleChangeShortFilmsInSaved={handleChangeShortFilmsInSaved}
        searchFilms={searchFilms}
        handleClearSearch={handleClearSearch}
      />
      <MoviesCardList
        films={films}
        type="saved"
        anotherResult={anotherResult}
        isSaved={true}
        preloading={preloading}
        handleDeleteMovie={handleDeleteMovie}
      />
    </section>
  );
};
