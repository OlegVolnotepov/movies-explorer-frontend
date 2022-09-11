import React from "react";
import "./main.css";
import { Promo } from "../Promo/Promo";
import { NavTab } from "../NavTab/NavTab";

export default function Main() {
  return (
    <div className="main">
      <Promo />
      <NavTab />
    </div>
  );
}
