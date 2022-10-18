import React from "react";
import { useEffect } from "react";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import "./movies.css";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";
import moviesApi from "../../utils/MoviesApi";
import { useState } from "react";

//todo если придет 1 или 2 фильма то криво отображаются
//todo если подгрузил уже список фильмов и поменял разрешение, то все сбросится

export const Movies = () => {
  const isLogged = React.useContext(LoggedStateContext);
  const [preloading, setPreloading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [films, setFilms] = useState([]);
  const [isNetworkErr, setSsNetworkErr] = useState(false);
  const [anotherResult, setAnotherResult] = useState("");
  const [count, setCount] = useState(16);
  const [filmsCount, setFilmsCount] = useState(null);
  const [isDisplayButton, setIsDisplayButton] = useState(false);
  const [filmsLength, setFilmsLength] = useState(3); //количество загружаемых фильмов
  const [uploadCount, setUploadCount] = useState(4); //количество подгружаемых фильмов
  const [screenWidth, setScreenWidth] = useState(
    document.documentElement.scrollWidth
  );
  function handleResize() {
    setScreenWidth(document.documentElement.scrollWidth);
  }

  window.addEventListener("resize", () => {
    setTimeout(handleResize, 1000);
  });

  React.useEffect(() => {
    isLogged.setIsLogged(true);
  }, [isLogged]);

  //устанавливаем количество загуржаемых фильмов в зависимости от разрешения экрана
  React.useEffect(() => {
    if (screenWidth > 768) {
      setFilmsLength(12);
      setUploadCount(4);
    } else if (screenWidth > 480 && screenWidth < 769) {
      setFilmsLength(8);
      setUploadCount(2);
    } else if (screenWidth <= 480) {
      setFilmsLength(5);
      setUploadCount(2);
    }
  }, [screenWidth]);

  function increaseFilms() {
    setFilms(
      JSON.parse(localStorage.getItem("films")).slice(
        0,
        films.length + uploadCount
      )
    );
  }

  function findMovies(movies) {
    const searchRequest = localStorage.getItem("requset");
    films.length = 0;
    const moviesFind = movies.filter(({ nameRU, nameEN }) =>
      [nameRU, nameEN].some((name) =>
        name.includes(searchRequest.toLowerCase())
      )
    );

    if (moviesFind.length == 0) {
      setAnotherResult("noResults");
    }

    setFilms(films.concat(moviesFind));
    localStorage.removeItem("films");
    localStorage.setItem("films", JSON.stringify(moviesFind));
  }

  function saveSearchRequestLocal(searchRequest) {
    localStorage.removeItem("requset");
    localStorage.setItem("requset", searchRequest);
  }

  function getMovies(searchRequest) {
    setAnotherResult("");
    setPreloading(true);
    saveSearchRequestLocal(searchRequest);
    setSearchValue(localStorage.getItem("requset"));
    moviesApi
      .getAllMovies()
      .then((data) => {
        findMovies(data);
      })
      .catch((err) => {
        setAnotherResult("networkErr");
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setPreloading(false);
      });
  }

  useEffect(() => {
    const allFilms = JSON.parse(localStorage.getItem("films"));
    setFilmsCount(allFilms.length);

    if (allFilms.length > 0) {
      setFilms(allFilms.slice(0, filmsLength));
    } else {
      setFilms(allFilms);
    }
  }, [filmsCount, preloading, filmsLength]);

  //Показ кнопки
  React.useEffect(() => {
    const allFilmsCount = JSON.parse(localStorage.getItem("films")).length;
    if (filmsLength < allFilmsCount) {
      setIsDisplayButton(true);
    } else {
      setIsDisplayButton(false);
    }
  }, [films.length, filmsLength]);

  return (
    <>
      <section className="movies">
        <SearchForm getMovies={getMovies} />
        <MoviesCardList
          increaseFilms={increaseFilms}
          preloading={preloading}
          films={films}
          type={""}
          isNetworkErr={isNetworkErr}
          anotherResult={anotherResult}
          isDisplayButton={isDisplayButton}
        />
      </section>
    </>
  );
};
