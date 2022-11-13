import React, { useState } from "react";
import "./profile.css";
import { Link } from "react-router-dom";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";
import { re } from "../../utils/constants";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const Profile = ({ handleSignout, handleChangeProfile }) => {
  const { userName, userEmail } = React.useContext(LoggedStateContext);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [submitActive, setSubmitActive] = useState(false);

  function handleChangeName(evt) {
    setNewName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setNewEmail(evt.target.value);
  }

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });

  function onSubmit(event) {
    event.preventDefault();
    handleChangeProfile(newName, newEmail);
    reset();
  }

  useEffect(() => {
    setNewName(userName);
    setNewEmail(userEmail);
  }, [userName, userEmail]);

  useEffect(() => {
    if (newEmail === userEmail && newName === userName) {
      setSubmitActive(false);
    } else {
      setSubmitActive(true);
    }
  }, [newEmail, newName, userEmail, userName]);

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {userName}</h1>
      <form className="profile__form" onSubmit={onSubmit}>
        <div className="profile__form-container">
          <fieldset className="profile__form-field" htmlFor="name">
            Имя
          </fieldset>
          <input
            id="name"
            className="profile__form-input"
            type="text"
            defaultValue={userName}
            onChange={handleChangeName}
          />
        </div>
        <div className="profile__form-line"></div>
        <div className="profile__form-container">
          <fieldset className="profile__form-field" htmlFor="email">
            E-mail
          </fieldset>
          <input
            id="email"
            className="profile__form-input"
            type="text"
            onChange={handleChangeEmail}
            defaultValue={userEmail}
          />
        </div>
        <button
          className={
            !submitActive
              ? "profile__btn profile__btn_disabled"
              : "profile__btn"
          }
          disabled={!submitActive}
          type="submit"
        >
          Редактировать
        </button>
        <Link to="/" className="profile__logout" onClick={handleSignout}>
          Выйти из аккаунта
        </Link>
      </form>
    </section>
  );
};
