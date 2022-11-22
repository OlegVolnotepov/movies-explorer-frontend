import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./main.css";
import { Promo } from "../Promo/Promo";
import { NavTab } from "../NavTab/NavTab";
import { AboutProject } from "../AboutProject/AboutProject";
import { Techs } from "../Techs/Techs";
import { AboutMe } from "../AboutMe/AboutMe";
import { Portfolio } from "../Portfolio/Portfolio";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";

export default function Main() {
  const { isLogged } = React.useContext(LoggedStateContext);
  let navigate = useNavigate();

  // useEffect(() => {
  //   if (isLogged) {
  //     navigate("/movies");
  //   }
  // }, []);

  return (
    <div className="main">
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </div>
  );
}
