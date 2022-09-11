import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import logoPath from "../../images/logo.svg";

export const Header = () => {
  return (
    <header className="header">
      <img src={logoPath} alt="логотип." className="header__logo" />
      <div className="header__right-block">
        <Link to="/" className="header__register">
          Регистрация
        </Link>
        <button className="header__login-btn">Войти</button>
      </div>
    </header>
  );
};
