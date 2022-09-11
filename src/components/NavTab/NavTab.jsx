import React from "react";
import "./navtab.css";
import { Link } from "react-router-dom";

export const NavTab = () => {
  return (
    <div className="navtab">
      <Link to="/" className="navtab__navlink">
        О проекте
      </Link>
      <Link to="/" className="navtab__navlink">
        Технологии
      </Link>
      <Link to="/" className="navtab__navlink">
        Студент
      </Link>
    </div>
  );
};
