import React from "react";
import { MoviesCard } from "../MoviesCard/MoviesCard";
import "./moviesCardList.css";
import { Preloader } from "../Preloader/Preloader";
import { AnotherResult } from "../AnotherResult/AnotherResult";
import { MoreButton } from "../MoreButton/MoreButton";
import { BASE_URL } from "../../utils/constants";

export const MoviesCardList = ({
  type,
  preloading,
  films,
  anotherResult,
  increaseFilms,
  isDisplayButton,
  handleAddMovie,
  handleDeleteMovie,
  isSaved,
}) => {
  return (
    <>
      {preloading ? (
        <Preloader />
      ) : anotherResult !== "" ? (
        <AnotherResult type={anotherResult} />
      ) : (
        <>
          <section className="moviesCardList">
            {films.map((film, index) => {
              return (
                <MoviesCard
                  handleAddMovie={handleAddMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  key={index}
                  film={{
                    country: film.country,
                    director: film.director,
                    duration: film.duration,
                    year: film.year,
                    description: film.description,
                    image: isSaved
                      ? film.image
                      : `${BASE_URL.BEATFILM_MOVIES}${film.image.url}`,
                    trailerLink: film.trailerLink,
                    nameRU: film.nameRU,
                    nameEN: film.nameEN,
                    thumbnail: isSaved
                      ? film.thumbnail
                      : `${BASE_URL.BEATFILM_MOVIES}${film.image.formats.thumbnail.url}`,
                    movieId: film.id,
                    isLiked: film.isLiked,
                    _id: film._id,
                  }}
                  type={type}
                />
              );
            })}
          </section>
          {isDisplayButton && <MoreButton increaseFilms={increaseFilms} />}
        </>
      )}
    </>
  );
};
