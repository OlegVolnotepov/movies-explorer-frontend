import React from "react";
import { useEffect } from "react";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import "./movies.css";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";

export const Movies = () => {
  const isLogged = React.useContext(LoggedStateContext);

  React.useEffect(() => {
    isLogged.setIsLogged(true);
  }, []);

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList />
    </section>
  );
};
