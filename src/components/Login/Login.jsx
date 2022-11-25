import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import logoImg from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { re } from "../../utils/constants";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";

export const Login = ({ handleLogin, loginMessage }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "all" });

  const [css, setCss] = useState("profile__message");

  const { isLogged } = React.useContext(LoggedStateContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate("/movies");
    }
  }, [isLogged, navigate]);

  function onSubmit(data) {
    handleLogin(data);
    reset();
  }

  useEffect(() => {
    if (loginMessage.includes("Ошибка")) {
      setCss("profile__message animated");
    } else {
      setCss("profile__message");
    }
  }, [loginMessage]);

  return (
    <section className="login">
      <div className="login__header">
        <Link to="/">
          <img src={logoImg} alt="логотип сайта." className="login__logo" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
      </div>

      <form
        formNoValidate
        className="login__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="login__text">
          E-mail
          <input
            {...register("email", {
              required: "Укажите почту",
              pattern: {
                value: re,
                message: "Неправильный формат почты",
              },
            })}
            className="login__input"
          />
          {errors.email && (
            <span className="login__error">{errors.email.message}</span>
          )}
        </label>
        <label className="login__text">
          Пароль
          <input
            {...register("password", {
              required: "Укажите пароль",
            })}
            type="password"
            className="login__input"
          />
          {errors.password && (
            <span className="login__error">{errors.password.message}</span>
          )}
        </label>
        <div className={css}>{loginMessage}</div>
        <button
          className={
            !isValid ? "login__submit login__submit_disabled" : "login__submit"
          }
          disabled={!isValid}
          type="submit"
        >
          Войти
        </button>
      </form>
      <div className="login__question-block">
        <p className="login__question-text">Еще не зарегистрированы?&nbsp;</p>
        <Link className="login__login" to="/signup">
          Зарегистрироваться
        </Link>
      </div>
    </section>
  );
};
