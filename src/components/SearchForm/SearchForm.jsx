import React from "react";
import "./searchForm.css";
import darkSearchIcon from "../../images/darkSearchIcon.svg";
import { useState } from "react";
import { useEffect } from "react";

export const SearchForm = () => {
  const [screenWidth, setScreenWidth] = useState(
    document.documentElement.scrollWidth
  );
  function handleResize() {
    setScreenWidth(document.documentElement.scrollWidth);
  }

  window.addEventListener("resize", handleResize);

  return (
    <>
      {screenWidth > 500 ? (
        <form className="searchForm">
          <div className="searchForm__container">
            <img src={darkSearchIcon} className="searchForm__icon" />
            <input
              className="searchForm__input"
              placeholder="Фильм"
              type="text"
              value=""
              required
            />
            <button type="submit" className="searchForm__button"></button>
          </div>
          <div className="searchForm__checkbox-container">
            <label class="searchForm__switch">
              <input type="checkbox" />
              <span class="searchForm__slider round"></span>
            </label>
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
            <label class="searchForm__switch">
              <input type="checkbox" />
              <span class="searchForm__slider round"></span>
            </label>
            <p className="searchForm__text">Короткометражки</p>
          </div>
          <div className="searchForm__line_mobile"></div>
        </>
      )}
    </>
  );
};
