import React from "react";
import "./anotherResult.css";

const message = {
  networkErr:
    "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
  noResults: "Ничего не найдено",
  savedEmpty: "",
};

export const AnotherResult = ({ type }) => {
  return (
    <div className="anotherResult">
      {type === "networkErr"
        ? message.networkErr
        : type === "savedPage"
        ? message.savedEmpty
        : message.noResults}
    </div>
  );
};
