import React from "react";
import { useEffect } from "react";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import "./movies.css";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";
import moviesApi from "../../utils/MoviesApi";
import { useState } from "react";
import api from "../../utils/Api";

//todo если придет 1 или 2 фильма то криво отображаются
//todo если подгрузил уже список фильмов и поменял разрешение, то все сбросится
//todo в сохраненных фильмах поиск только по ним

//todo юзэффект, который запрашивает фильмы и обновлет локалсторадж и аллфилмс(филмс)
//todo логика работы с иконкой лайка и удаления
//todo работа со траницей сохр фильмы

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
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [allFilms, setAllFilms] = useState([]); //?наверное это все найденные фильмы
  const [isLiked, setIsLiked] = useState(undefined);
  const [temp, setTemp] = useState(1); // тригер для вызова обновления фильмов

  //до этого было const allfilms, небыло юзстейта. Сделал для того что бы обновлять лайк
  //let allFilms = JSON.parse(localStorage.getItem("films")) || [];

  const allFilmsShort = (
    JSON.parse(localStorage.getItem("films")) || []
  ).filter((item) => item.duration <= 40);

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
    if (isShortFilm) {
      setFilms(allFilmsShort.slice(0, films.length + uploadCount));
    } else {
      setFilms(allFilms.slice(0, films.length + uploadCount));
    }
  }

  function findMovies(movies) {
    const searchRequest = localStorage.getItem("requset").toLocaleLowerCase();
    films.length = 0;

    //переписываю на ру поиск только, т.к не ищет норм
    const moviesFind = movies.filter(({ nameRU, nameEN }) =>
      [nameRU, nameEN].some((name) =>
        name.toLocaleLowerCase().includes(searchRequest)
      )
    );

    if (moviesFind.length == 0) {
      return setAnotherResult("noResults");
    }

    //setFilms(films.concat(moviesFind));
    setAllFilms(moviesFind);

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

  function handleChangeShortFilms() {
    if (localStorage.getItem("short") == "true") {
      localStorage.setItem("short", false);
      setIsShortFilm(!isShortFilm);
    } else {
      localStorage.setItem("short", true);
      setIsShortFilm(!isShortFilm);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("short") == "true") {
      loadFilms(allFilmsShort);
    } else {
      loadFilms(allFilms);
    }
  }, [isShortFilm]);

  //походу здесь мы задаем все фильмы в переменную, которая потом уйдет в загрузку для компонентов
  useEffect(() => {
    let timeaArr = JSON.parse(localStorage.getItem("films")) || [];
    setAllFilms(timeaArr);
  }, [films]);

  function loadFilms(allFilms) {
    if (localStorage.getItem("short") == "true") {
      setFilmsCount(allFilmsShort.length);
      if (allFilmsShort.length > 0) {
        setFilms(allFilmsShort.slice(0, filmsLength));
      } else {
        setFilms(allFilmsShort);
      }
    } else {
      setFilmsCount(allFilms.length);
      if (allFilms.length > 0) {
        setFilms(allFilms.slice(0, filmsLength));
      } else {
        setFilms(allFilms);
      }
    }
  }

  //финальныя загрузка всех отображаемых фильмов
  useEffect(() => {
    loadFilms(allFilms);
  }, [filmsCount, preloading, filmsLength, temp]);

  //Показ кнопки
  React.useEffect(() => {
    if (isShortFilm) {
      const allFilmsCount = allFilmsShort.length;
      if (filmsLength < allFilmsCount) {
        setIsDisplayButton(true);
      } else {
        setIsDisplayButton(false);
      }
    } else {
      const allFilmsCount = allFilms.length;
      if (filmsLength < allFilmsCount) {
        setIsDisplayButton(true);
      } else {
        setIsDisplayButton(false);
      }
    }
  }, [films.length, filmsLength]);

  //todo это будет функция именно добавления на сервер, а часть с изменением локалсторадж вынести в юзэффект
  function handleAddMovie(film) {
    api
      .addMovie(film)
      .then((response) => {
        //todo наверное надо здесь менять стейт allFilms для установки лайка
        let updatedArray = JSON.parse(localStorage.getItem("films"));
        updatedArray.forEach((item) => {
          if (item.id == film.movieId) {
            item._id = response._id;
            item.owner = response.owner;
          }
        });
        localStorage.removeItem("films");
        localStorage.setItem("films", JSON.stringify(updatedArray));
        handleSetAllFilms(updatedArray);
        setTemp((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleSetAllFilms(data) {
    setAllFilms([]);
    setAllFilms(data);
  }

  function handleDeleteMovie(film) {
    api
      .deleteMovie(film._id)
      .then((response) => {
        let updatedArray = JSON.parse(localStorage.getItem("films"));
        updatedArray.forEach((item) => {
          if (item._id == film._id) {
            delete item._id;
            delete item.owner;
          }
        });
        localStorage.removeItem("films");
        localStorage.setItem("films", JSON.stringify(updatedArray));
        handleSetAllFilms(updatedArray);
        setTemp((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  //функция обновления локалсторадж - так же добавить функцию добавления, если на серваке есть а в локал нет
  function updateLocalStorage() {
    api
      .getMovies()
      .then((res) => {
        let updatedArray = JSON.parse(localStorage.getItem("films"));
        if (!res.length) {
          updatedArray.forEach((item) => {
            delete item._id;
            delete item.owner;
          });
          localStorage.removeItem("films");
          localStorage.setItem("films", JSON.stringify(updatedArray));
        } else {
          //здесь удаяются лишние фильмы(если в ЛС содержится _id, которого нет на серваке, то его удаляем)
          updatedArray.forEach((item) => {
            if (item._id) {
              delete item._id;
              delete item._owner;
            }
          });

          //todo нужно соеденить res и updatedArray.

          //рабочая но не понятная схема
          // const output = updatedArray.map((e) =>
          //   res.some(({ nameRU }) => nameRU == e.nameRU)
          //     ? { ...e, ...res.find(({ nameRU }) => nameRU == e.nameRU) }
          //     : e
          // );

          const output = updatedArray.map((element) => {
            const newEl = res.filter((e) => e.nameRU === element.nameRU);
            if (newEl[0] != undefined) {
              element._id = newEl[0]._id;
              element.owner = newEl[0].owner;
              return element;
            } else {
              return element;
            }
          });

          localStorage.removeItem("films");
          localStorage.setItem("films", JSON.stringify(output));
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  //todo тестирую обновление массива фильмов
  useEffect(() => {
    updateLocalStorage();
  }, []);

  //todo нужен юзэффект, если фильм добавлен, что бы отприсовывать лайк

  return (
    <>
      <section className="movies">
        <SearchForm
          getMovies={getMovies}
          handleChangeShortFilms={handleChangeShortFilms}
        />
        <MoviesCardList
          increaseFilms={increaseFilms}
          preloading={preloading}
          films={films}
          type={""}
          isNetworkErr={isNetworkErr}
          anotherResult={anotherResult}
          isDisplayButton={isDisplayButton}
          handleAddMovie={handleAddMovie}
          handleDeleteMovie={handleDeleteMovie}
        />
      </section>
    </>
  );
};
