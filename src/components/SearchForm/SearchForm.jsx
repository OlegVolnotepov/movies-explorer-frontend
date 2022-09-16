import React from "react";
import "./searchForm.css";
import darkSearchIcon from "../../images/darkSearchIcon.svg";

export const SearchForm = () => {
  return (
    <>
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
      <div className="searchForm__line"></div>
    </>
  );
};
