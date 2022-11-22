import React, { useEffect, useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import logoImg from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { re } from "../../utils/constants";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";
import { Preloader } from "../Preloader/Preloader";

export const Register = ({ handleRegister, preloading, registerMessage }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "all" });
  const { isLogged } = React.useContext(LoggedStateContext);
  const [css, setCss] = useState("profile__message");
  let navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate("/movies");
    }
  }, []);

  const onSubmit = (data) => {
    handleRegister(data);
    reset();
  };

  useEffect(() => {
    if (registerMessage.includes("Ошибка")) {
      setCss("profile__message animated");
    } else {
      setCss("profile__message");
    }
  }, [registerMessage]);

  return (
    <section className="register">
      <div className="register__header">
        <Link to="/">
          <img src={logoImg} alt="логотип сайта." className="register__logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="register__form">
        <label className="register__text">
          Имя
          <input
            type="text"
            className="register__input"
            {...register("name", {
              required: "Укажите имя",
              pattern: {
                value: /[a-zа-яё ]/iu,
                message:
                  "Имя должно содержать только латиницу, кириллицу, пробел или дефис",
              },
            })}
          />
          {errors.name && (
            <span className="register__error">{errors.name.message}</span>
          )}
        </label>
        <label className="register__text">
          E-mail
          <input
            type="email"
            className="register__input"
            {...register("email", {
              required: "Укажите почту",
              pattern: {
                value: re,
                message: "Неправильный формат почты",
              },
            })}
          />
          {errors.email && (
            <span className="register__error">{errors.email.message}</span>
          )}
        </label>
        <label className="register__text">
          Пароль
          <input
            type="password"
            className="register__input"
            {...register("password", {
              required: "Укажите пароль",
              minLength: {
                value: 2,
                message: "Минимум 2 символа",
              },
            })}
          />
          {errors.password && (
            <span className="register__error">{errors.password.message}</span>
          )}
        </label>
        <div className={css}>{registerMessage}</div>
        {preloading ? (
          <Preloader />
        ) : (
          <button
            disabled={!isValid}
            className={
              !isValid
                ? "register__submit register__submit_disabled"
                : "register__submit"
            }
            type="submit"
          >
            Зарегистрироваться
          </button>
        )}
      </form>
      <div className="register__question-block">
        <p className="register__question-text">Уже зарегистрированы?&nbsp;</p>
        <Link className="register__login" to="/signin">
          Войти
        </Link>
      </div>
    </section>
  );
};
