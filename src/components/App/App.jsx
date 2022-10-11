import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import Main from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { Register } from "../Register/Register";
import { NotFound } from "../NotFound/NotFound";
import { Login } from "../Login/Login";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";
import { Profile } from "../Profile/Profile";
import { React, useEffect, useState } from "react";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <LoggedStateContext.Provider value={{ isLogged, setIsLogged }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/saved-movies" element={<SavedMovies />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Route>
        </Routes>
      </div>
    </LoggedStateContext.Provider>
  );
}

export default App;

{
  /* <>
            <div className="header__right-block">
              <Link to="/register" className="header__register">
                Регистрация
              </Link>
              <button className="header__login-btn">Войти</button>
            </div>
          </>

<div className="header__right-block">
<button className="header__burger-btn" onClick={openMenu} />
</div> */
}
