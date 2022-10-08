import React from "react";
import "./footer.css";

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
            target="_blank"
            href="https://practicum.yandex.ru/"
            className="footer__text footer__link"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            target="_blank"
            href="https://github.com/OlegVolnotepov"
            className="footer__text footer__link"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
};
