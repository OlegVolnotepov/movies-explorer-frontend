import React from "react";
import { MoviesCard } from "../MoviesCard/MoviesCard";
import "./moviesCardList.css";
import film1Img from "../../images/film1.jpg";
import film2Img from "../../images/film2.jpg";

const movies = [
  { title: "Film1", length: "1.42", img: film1Img },
  { title: "Film2", length: "0.42", img: film1Img },
  { title: "Film3", length: "1.42", img: film2Img },
  { title: "Film4", length: "1.42", img: film2Img },
  { title: "Film1", length: "1.42", img: film1Img },
  { title: "Film2", length: "0.42", img: film1Img },
  { title: "Film3", length: "1.42", img: film2Img },
  { title: "Film4", length: "1.42", img: film2Img },
  { title: "Film1", length: "1.42", img: film1Img },
  { title: "Film2", length: "0.42", img: film1Img },
  { title: "Film3", length: "1.42", img: film2Img },
  { title: "Film4", length: "1.42", img: film2Img },
  { title: "Film1", length: "1.42", img: film1Img },
  { title: "Film2", length: "0.42", img: film1Img },
  { title: "Film3", length: "1.42", img: film2Img },
  { title: "Film4", length: "1.42", img: film2Img },
];

export const MoviesCardList = (type) => {
  return (
    <section className="moviesCardList">
      {movies.map((film, index) => {
        return <MoviesCard key={index} film={film} type={type} />;
      })}
      <button type="button" className="moviesCardList__button">
        Еще
      </button>
    </section>
  );
};
