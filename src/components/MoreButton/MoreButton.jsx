import React from "react";
import "./moreButton.css";

export const MoreButton = ({ increaseFilms }) => {
  return (
    <button onClick={increaseFilms} type="button" className="moreButton">
      Еще
    </button>
  );
};
