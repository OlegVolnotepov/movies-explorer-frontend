import React from "react";
import "./aboutMe.css";
import me from "../../images/me.jpg";

export const AboutMe = () => {
  return (
    <section className="aboutMe">
      <h2 className="aboutMe__header">Студент</h2>
      <div className="aboutMe__wrapper">
        <div className="aboutMe__container-text">
          <div>
            <h3 className="aboutMe__title">Олег</h3>
            <p className="aboutMe__subtitle">Фронтенд-разработчик, 32 года</p>
            <p className="aboutMe__text">
              Я родился и живу в Калуге. Работаю в IT и мечтаю стать
              профессиональным Фронтенд-разработчиком. Люблю горы, лыжи и
              баскетбол.
            </p>
          </div>
          <a href="https://github.com/OlegVolnotepov" className="aboutMe__link">
            GitHub
          </a>
        </div>
        <img src={me} className="aboutMe__img" alt="фото автора проекта"></img>
      </div>
    </section>
  );
};
