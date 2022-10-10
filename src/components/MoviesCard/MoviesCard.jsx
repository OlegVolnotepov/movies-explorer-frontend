import React from "react";
import "./moviesCard.css";

export const MoviesCard = ({ film, type }) => {
  const pageType = type.type;
  const { title, length, img } = film;
  return (
    <div className="moviesCard">
      <div className="moviesCard__img-container">
        <img className="moviesCard__img" src={img} />
      </div>
      <div className="moviesCard__botton-container">
        <div className="moviesCard__description">
          <p className="moviesCard__title">{title}</p>
          <p className="moviesCard__length">{length}</p>
        </div>
        <div className="moviesCard__button-container">
          <button
            type="button"
            className={
              pageType == "saved"
                ? "moviesCard__button-close"
                : "moviesCard__button"
            }
          />
        </div>
      </div>
    </div>
  );
};
