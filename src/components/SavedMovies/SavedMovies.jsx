import React, { useState } from "react";
import "./savedMovies.css";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";
import api from "../../utils/Api";
import { useEffect } from "react";

export const SavedMovies = () => {
  const isLogged = React.useContext(LoggedStateContext);
  const [films, setFilms] = useState([]);
  const [preloading, setPreloading] = useState(false);
  const [anotherResult, setAnotherResult] = useState("");
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [shortFilms, setShortFilms] = useState([]);
  const [filmsStorage, setFilmsStorage] = useState([]); // все загруженные фильмы

  function fetchFilms() {
    api
      .getMovies()
      .then((res) => {
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
        setFilmsStorage(res);

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

  function handleChangeShortFilms() {
    if (localStorage.getItem("short") == "true") {
      localStorage.setItem("short", false);
      setIsShortFilm(!isShortFilm);
    } else {
      localStorage.setItem("short", true);
      setIsShortFilm(!isShortFilm);
    }
  }

  //создаем массив короткометражек
  useEffect(() => {
    if (films.length > 0) {
      setShortFilms(films.filter((item) => item.duration < 41));
    }
  }, [films]);

  useEffect(() => {
    const localStateIsShort = localStorage.getItem("short") === "true";
    setIsShortFilm(localStateIsShort);

    if (isShortFilm) {
      setFilms([]);
      setFilms(shortFilms);
    } else {
      setPreloading(true);
      api
        .getMovies()
        .then((res) => {
          setFilms(res);

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
    }
  }, [isShortFilm]);

  const handleClearSearch = () => {
    setFilms(filmsStorage);
  };

  return (
    <section className="savedMovies">
      <SearchForm
        path={"saved"}
        handleChangeShortFilms={handleChangeShortFilms}
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
