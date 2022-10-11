import React from "react";
import "./profile.css";
import { Link } from "react-router-dom";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";

export const Profile = () => {
  const isLogged = React.useContext(LoggedStateContext);
  React.useEffect(() => {
    isLogged.setIsLogged(true);
  }, []);
  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Андрей</h1>
      <form className="profile__form">
        <div className="profile__form-container">
          <fieldset className="profile__form-field" for="name">
            Имя
          </fieldset>
          <input
            id="name"
            className="profile__form-input"
            type="text"
            value="Андрей"
          />
        </div>
        <div className="profile__form-line"></div>
        <div className="profile__form-container">
          <fieldset className="profile__form-field" for="email">
            E-mail
          </fieldset>
          <input
            id="email"
            className="profile__form-input"
            type="text"
            value="pochta@yandex.ru"
          />
        </div>
        <button className="profile__btn">Редактировать</button>
        <Link to="/" className="profile__logout">
          Выйти из аккаунта
        </Link>
      </form>
    </section>
  );
};
