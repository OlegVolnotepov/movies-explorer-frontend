import React from "react";
import "./moviesCard.css";
import { BASE_URL } from "../../utils/constants";
import { useEffect } from "react";
import { useState } from "react";

export const MoviesCard = ({
  film,
  type,
  handleAddMovie,
  handleDeleteMovie,
}) => {
  const [time, setTime] = useState("");
  const [active, setActive] = useState(false);

  console.log(active);

  function setActiveButton() {
    if (active) {
      setActive(false);
      handleDeleteMovie(film);
    } else {
      console.log("activate");
      setActive(true);
      handleAddMovie(film);
    }
  }

  const pageType = type.type;
  const {
    id,
    nameRU,
    nameEN,
    director,
    country,
    year,
    duration,
    description,
    trailerLink,
    created_at,
    updated_at,
    image,
    _id,
  } = film;

  function getTimeFromMins(duration) {
    let hours = Math.trunc(duration / 60);
    let minutes = duration % 60;
    const time = hours + "ч" + minutes + "м";
    setTime(time);
  }

  useEffect(() => getTimeFromMins(duration), []);

  useEffect(() => {
    if (_id) {
      setActive(true);
    }
  }, []);

  console.log(type);

  return (
    <div className="moviesCard">
      <div className="moviesCard__img-container">
        <a href={trailerLink} target="_blank" rel="noreferrer">
          {" "}
          <img className="moviesCard__img" src={image} alt="film" />
        </a>
      </div>
      <div className="moviesCard__botton-container">
        <div className="moviesCard__description">
          <p className="moviesCard__title">{nameRU}</p>
          <p className="moviesCard__length">{time}</p>
        </div>
        <div className="moviesCard__button-container">
          <button
            onClick={setActiveButton}
            type="button"
            className={
              type == "saved"
                ? "moviesCard__button-close"
                : active
                ? "moviesCard__button moviesCard__button_active"
                : "moviesCard__button"
            }
          />
        </div>
      </div>
    </div>
  );
};

// className={
//   pageType == "saved"
//     ? "moviesCard__button-close"
//     : active
//     ? "moviesCard__button moviesCard__button_active"
//     : "moviesCard__button"
// }

// className={
//   active
//     ? "moviesCard__button moviesCard__button_active"
//     : "moviesCard__button"
// }

// className={
//   pageType == "saved"
//     ? "moviesCard__button-close"
//     : active
//     ? "moviesCard__button moviesCard__button_active"
//     : "moviesCard__button"
// }
