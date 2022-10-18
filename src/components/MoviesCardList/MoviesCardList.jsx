import React from "react";
import { MoviesCard } from "../MoviesCard/MoviesCard";
import "./moviesCardList.css";
import { Preloader } from "../Preloader/Preloader";
import { AnotherResult } from "../AnotherResult/AnotherResult";
import { MoreButton } from "../MoreButton/MoreButton";

export const MoviesCardList = ({
  type,
  preloading,
  films,
  anotherResult,
  increaseFilms,
  isDisplayButton,
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
              return <MoviesCard key={index} film={film} type={type} />;
            })}
          </section>
          {isDisplayButton && <MoreButton increaseFilms={increaseFilms} />}
        </>
      )}
    </>
  );
};
