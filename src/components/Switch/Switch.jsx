import React from "react";
import "./Switch.css";

export const Switch = ({ isOn, handleToggle }) => {
  return (
    <>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        checked={isOn}
        onChange={handleToggle}
      />
      <label
        style={{ background: isOn && "#06D6A0" }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};
