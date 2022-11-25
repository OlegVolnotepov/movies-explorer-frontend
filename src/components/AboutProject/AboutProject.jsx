import React from "react";
import "./aboutProject.css";

export const AboutProject = () => {
  return (
    <section className="aboutProject">
      <h2 className="aboutProject__title">О проекте</h2>
      <div className="aboutProject__wrapper">
        <div className="aboutProject__block-wrapper">
          <h2 className="aboutProject__titles">
            Дипломный проект включал 5 этапов
          </h2>
          <p className="aboutProject__subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="aboutProject__block-wrapper">
          <h2 className="aboutProject__titles">
            На выполнение диплома ушло 5 недель
          </h2>
          <p className="aboutProject__subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="aboutProject__progress">
        <div className="aboutProject__progress-block">
          <div className="aboutProject__progress-week aboutProject__progress-week_first">
            1 неделя
          </div>
          <p className="aboutProject__progress-item">Back-end</p>
        </div>
        <div className="aboutProject__progress-block">
          <div className="aboutProject__progress-week">4 недели</div>
          <p className="aboutProject__progress-item">Front-end</p>
        </div>
      </div>
    </section>
  );
};
