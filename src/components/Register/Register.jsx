import React from "react";
import "./register.css";
import logoImg from "../../images/logo.svg";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <section className="register">
      <div className="register__header">
        <Link to="/">
          <img src={logoImg} alt="логотип сайта." className="register__logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
      </div>

      <form className="register__form">
        <label className="register__text">
          Имя
          <input type="text" className="register__input" />
          <span className="register__error">error</span>
        </label>
        <label className="register__text">
          E-mail
          <input type="email" className="register__input" />
          <span className="register__error">error</span>
        </label>
        <label className="register__text">
          Пароль
          <input type="password" className="register__input" />
          <span className="register__error">error</span>
        </label>
        <button className="register__submit" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="register__question-block">
        <p className="register__question-text">Уже зарегистрированы?&nbsp;</p>
        <Link className="register__login" to="/login">
          Войти
        </Link>
      </div>
    </section>
  );
};
