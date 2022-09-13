import React from "react";
import "./portfolio.css";
import linkIcon from "../../images/link-icon.svg";

export const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <div className="portfolio__item">
        <a href="#" className="portfolio__link">
          Статичный сайт
        </a>
        <img src={linkIcon} />
      </div>
      <div className="portfolio__item">
        <a href="#" className="portfolio__link">
          Адаптивный сайт
        </a>
        <img src={linkIcon} />
      </div>
      <div className="portfolio__item">
        <a href="#" className="portfolio__link">
          Одностраничное приложение
        </a>
        <img src={linkIcon} />
      </div>
    </section>
  );
};
