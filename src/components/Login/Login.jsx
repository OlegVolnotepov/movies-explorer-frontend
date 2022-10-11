import React from "react";
import "./login.css";
import logoImg from "../../images/logo.svg";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <section className="login">
      <div className="login__header">
        <Link to="/">
          <img src={logoImg} alt="логотип сайта." className="login__logo" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
      </div>

      <form className="login__form">
        <label className="login__text">
          E-mail
          <input type="email" className="login__input" />
          <span className="login__error">error</span>
        </label>
        <label className="login__text">
          Пароль
          <input type="password" className="login__input" />
          <span className="login__error">error</span>
        </label>
        <button className="login__submit" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="login__question-block">
        <p className="login__question-text">Еще не зарегистрированы?&nbsp;</p>
        <Link className="login__login" to="/register">
          Зарегистрироваться
        </Link>
      </div>
    </section>
  );
};
