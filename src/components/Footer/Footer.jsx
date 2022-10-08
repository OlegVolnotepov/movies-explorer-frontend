import React from "react";
import "./Footer";

export const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__wrapper">
        <div className="footer__text">© 2022</div>
        <div className="footer__right-container">
          <a
            href="https://practicum.yandex.ru"
            className="footer__text footer__link"
          >
            Яндекс.Практикум
          </a>
          <a
            href="https://github.com/OlegVolnotepov"
            className="footer__text footer__link"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
};
