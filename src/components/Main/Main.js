import React from "react";
import "./main.css";
import { Promo } from "../Promo/Promo";
import { NavTab } from "../NavTab/NavTab";
import { AboutProject } from "../AboutProject/AboutProject";
import { Techs } from "../Techs/Techs";

export default function Main() {
  return (
    <div className="main">
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
    </div>
  );
}
