import React from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";
import logoPath from "../../images/logo.svg";
import accIcon from "../../images/accIcon.svg";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";

export const Header = () => {
  const isLogged = React.useContext(LoggedStateContext);
  let location = useLocation();
  return (
    <header
      className={location.pathname === "/" ? "header header__main" : "header"}
    >
      <div className="header__wrapper">
        <Link to="/">
          <img src={logoPath} alt="логотип." className="header__logo" />
        </Link>
        {isLogged && (
          <div className="header__center-block">
            <Link className="header__movies-link" to="/movies">
              Фильмы
            </Link>
            <Link className="header__movies-link" to="/saved-movies">
              <p className="header__title">Сохраненные фильмы</p>
            </Link>
          </div>
        )}

        <div className="header__right-block">
          {isLogged ? (
            <Link to="/profile" className="header__register">
              <span>Аккаунт</span>
              <img src={accIcon} className="header__accIcon" />
            </Link>
          ) : (
            <>
              <Link to="/register" className="header__register">
                Регистрация
              </Link>
              <button className="header__login-btn">Войти</button>
            </>
          )}

          {/* <Link to="/register" className="header__register">
          <span>Аккаунт</span>
          <img src={accIcon} className="header__accIcon" />
        </Link> */}
        </div>
      </div>
    </header>
  );
};
