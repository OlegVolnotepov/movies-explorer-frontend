import React from "react";
import { NavLink } from "react-router-dom";
import "./menuPopup.css";
import accIcon from "../../images/accIcon.svg";
import cloeIcon from "../../images/closeIcon.svg";

export const MenuPopup = ({ location, isMenuOpen, closeMenu }) => {
  return (
    <div className={isMenuOpen ? "popup popup_opend" : "popup"}>
      <div className="menuPopup">
        <button className="menuPopup__close" onClick={closeMenu} />
        <ul className="menuPopup__links">
          <li className="menuPopup__item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active" : "menuPopup__link"
              }
              to="/"
            >
              Главная
            </NavLink>
          </li>
          <li className="menuPopup__item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active" : "menuPopup__link"
              }
              to="/movies"
            >
              Фильмы
            </NavLink>
          </li>
          <li className="menuPopup__item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active" : "menuPopup__link"
              }
              to="/saved-movies"
            >
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
        <div className="menuPopup__bottom-wrapper">
          <NavLink className="menuPopup__link menuPopup__acc" to="/profile">
            Аккаунт<img className="menuPopup__accIcon" src={accIcon}></img>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
