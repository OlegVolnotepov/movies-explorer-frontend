import React from "react";
import { useLocation } from "react-router-dom";
import "./searchForm.css";
import darkSearchIcon from "../../images/darkSearchIcon.svg";
import { useState } from "react";
import { useEffect } from "react";
import { Switch } from "../Switch/Switch.jsx";

export const SearchForm = ({
  getMovies,
  handleChangeShortFilms,
  searchFilms,
  path,
  handleClearSearch,
  handleChangeShortFilmsInSaved,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [isCheked, setIsCheked] = useState();
  const [value, setValue] = useState(false);
  let location = useLocation();
  function handleResize() {
    setScreenWidth(window.screen.width);
  }

  function handleChangeValue(e) {
    setSearchValue(e.target.value);
  }

  function submitForm(event) {
    event.preventDefault();
    if (path) {
      searchFilms(searchValue);
    } else {
      getMovies(searchValue);
    }
  }

  function handleCheck() {
    if (path === "saved") {
      handleChangeShortFilmsInSaved();
      setValue(!value);
      return;
    }
    handleChangeShortFilms();
    setValue(!value);
  }

  useEffect(() => {
    if (searchValue === "" && path === "saved") {
      handleClearSearch();
    }
  }, [searchValue]);

  useEffect(() => {
    if (path === "saved") {
      setIsCheked(localStorage.getItem("shortSaved"));
      setValue(localStorage.getItem("shortSaved") === "true" ? true : false);
    } else {
      setIsCheked(localStorage.getItem("short"));
      setValue(localStorage.getItem("short") === "true" ? true : false);
    }
  }, [isCheked, path, value]);

  useEffect(() => {
    setSearchValue(localStorage.getItem("requset"));
  }, []);

  window.addEventListener("resize", handleResize);

  return (
    <>
      {screenWidth > 500 ? (
        <form className="searchForm" onSubmit={submitForm}>
          <div className="searchForm__container">
            <img src={darkSearchIcon} className="searchForm__icon" />
            <input
              className="searchForm__input"
              placeholder="Фильм"
              type="text"
              value={searchValue || ""}
              onChange={handleChangeValue}
              required
            />
            <button type="submit" className="searchForm__button"></button>
          </div>
          <div className="searchForm__checkbox-container">
            <Switch isOn={value} handleToggle={handleCheck} />
            <p className="searchForm__text">Короткометражки</p>
          </div>
        </form>
      ) : (
        <>
          <form className="searchForm">
            <div className="searchForm__container">
              <img
                alt="иконка поиска."
                src={darkSearchIcon}
                className="searchForm__icon"
              />
              <input
                className="searchForm__input"
                placeholder="Фильм"
                type="text"
                value=""
                required
              />
              <button
                type="submit"
                className="searchForm__button_mobile"
              ></button>
            </div>
          </form>
          <div className="searchForm__checkbox-container_mobile">
            <label className="searchForm__switch">
              <input type="checkbox" />
              <span className="searchForm__slider round"></span>
            </label>
            <p className="searchForm__text">Короткометражки</p>
          </div>
          <div className="searchForm__line_mobile"></div>
        </>
      )}
    </>
  );
};
