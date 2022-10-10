import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import "./layout.css";
const forbiddenLink = ["/404", "/signin", "/signup"];

export const Layout = () => {
  let location = useLocation();

  return (
    <div className="layout">
      {!forbiddenLink.includes(location.pathname) && <Header />}
      <main>
        <Outlet />
      </main>
      {!forbiddenLink.includes(location.pathname) && <Footer />}
    </div>
  );
};
