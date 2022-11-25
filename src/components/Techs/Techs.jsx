import React from "react";
import "./techs.css";

export const Techs = () => {
  return (
    <section className="techs">
      <h2 className="techs__header">Технологии</h2>
      <div className="techs__wrapper">
        <h3 className="techs__title">7 технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__techs-items">
          <li className="techs__techs-item">HTML</li>
          <li className="techs__techs-item">CSS</li>
          <li className="techs__techs-item">JS</li>
          <li className="techs__techs-item">React</li>
          <li className="techs__techs-item">Git</li>
          <li className="techs__techs-item">Express.js</li>
          <li className="techs__techs-item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
};
