import React from "react";
import "./Preloader.css";
import preloader from "../../images/preloader.svg";

export const Preloader = () => {
  return <img className="preloader" src={preloader}></img>;
};
