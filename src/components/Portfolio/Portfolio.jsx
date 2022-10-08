import React from "react";
import "./portfolio.css";
import linkIcon from "../../images/link-icon.svg";
import { Link } from "react-router-dom";

export const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <a
        target="_blank"
        href="https://github.com/OlegVolnotepov/how-to-learn"
        className="portfolio__item"
        rel="noreferrer"
      >
        <p className="portfolio__link">Статичный сайт</p>
        <img className="portfolio__img" src={linkIcon} />
      </a>
      <a
        target="_blank"
        href="https://github.com/OlegVolnotepov/russian-travel"
        className="portfolio__item"
        rel="noreferrer"
      >
        <p className="portfolio__link">Адаптивный сайт</p>
        <img className="portfolio__img" src={linkIcon} />
      </a>
      <a
        target="_blank"
        href="https://github.com/OlegVolnotepov/react-mesto-api-full"
        className="portfolio__item"
        rel="noreferrer"
      >
        <p className="portfolio__link">Одностраничное приложение</p>
        <img className="portfolio__img" src={linkIcon} />
      </a>
    </section>
  );
};
