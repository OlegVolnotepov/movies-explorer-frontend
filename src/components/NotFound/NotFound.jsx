import React from "react";
import "./notFound.css";

export const NotFound = () => {
  return (
    <div className="notFound">
      <h1 className="notFound__title">404</h1>
      <p className="notFound__subtitle">Страница не найдена</p>
      <a href="/" className="notFound__link">
        Назад
      </a>
    </div>
  );
};
