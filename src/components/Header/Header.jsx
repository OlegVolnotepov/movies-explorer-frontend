import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import logoPath from "../../images/logo.svg";
import accIcon from "../../images/accIcon.svg";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";

export const Header = () => {
  const isLogged = React.useContext(LoggedStateContext);
  return (
    <header className="header">
      <Link to="/">
        <img src={logoPath} alt="логотип." className="header__logo" />
      </Link>
      <div className="header__center-block">
        <Link className="header__movies-link" to="/movies">
          Фильмы
        </Link>
        <p className="header__title">Сохраненные фильмы</p>
      </div>
      <div className="header__right-block">
        {isLogged ? (
          <Link to="/register" className="header__register">
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
    </header>
  );
};
