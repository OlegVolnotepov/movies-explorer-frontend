import React from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";
import logoPath from "../../images/logo.svg";
import accIcon from "../../images/accIcon.svg";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";
import { MenuPopup } from "../MenuPopup/MenuPopup";
import { useEffect, useState } from "react";

export const Header = () => {
  const isLogged = React.useContext(LoggedStateContext);
  const [screenWidth, setScreenWidth] = useState(
    document.documentElement.scrollWidth
  );
  function handleResize() {
    setScreenWidth(document.documentElement.scrollWidth);
  }

  window.addEventListener("resize", handleResize);
  let location = useLocation();
  const [isMenuOpen, setisMenuOpen] = useState(false);
  function openMenu() {
    setisMenuOpen(true);
  }
  function closeMenu() {
    setisMenuOpen(false);
  }
  return (
    <header
      className={location.pathname === "/" ? "header header__main" : "header"}
    >
      <div className="header__wrapper">
        <Link to="/">
          <img src={logoPath} alt="логотип." className="header__logo" />
        </Link>
        {isLogged.isLogged ? (
          <>
            {screenWidth > 768 ? (
              <>
                <div className="header__center-block">
                  <Link className="header__movies-link" to="/movies">
                    Фильмы
                  </Link>
                  <Link className="header__movies-link" to="/saved-movies">
                    <p className="header__title">Сохраненные фильмы</p>
                  </Link>
                </div>
                <div className="header__right-block">
                  <Link to="/profile" className="header__register">
                    <span>Аккаунт</span>
                    <img
                      src={accIcon}
                      className="header__accIcon"
                      alt="ссылка для редактирования аккаунта."
                    />
                  </Link>
                </div>
              </>
            ) : (
              <div className="header__right-block">
                <button className="header__burger-btn" onClick={openMenu} />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="header__right-block">
              <Link to="/signup" className="header__register">
                Регистрация
              </Link>
              <Link to="/signin">
                <button className="header__login-btn">Войти</button>
              </Link>
            </div>
          </>
        )}
      </div>
      <MenuPopup
        closeMenu={closeMenu}
        isMenuOpen={isMenuOpen}
        location={location.pathname}
      ></MenuPopup>
    </header>
  );
};
