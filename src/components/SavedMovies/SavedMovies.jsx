import React from "react";
import "./savedMovies.css";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { SearchForm } from "../SearchForm/SearchForm";

export const SavedMovies = () => {
  return (
    <div className="savedMovies">
      <SearchForm />
      <MoviesCardList type="saved" />
    </div>
  );
};
