import React from "react";
import "./savedMovies.css";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";

export const SavedMovies = () => {
  const isLogged = React.useContext(LoggedStateContext);
  React.useEffect(() => {
    isLogged.setIsLogged(true);
  }, []);
  return (
    <section className="savedMovies">
      <SearchForm />
      <MoviesCardList type="saved" />
    </section>
  );
};
