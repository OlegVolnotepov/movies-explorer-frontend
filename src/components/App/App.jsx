import "./App.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
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
import { register, checkValidityToken, auth } from "../../utils/Auth";
import api from "../../utils/Api";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  let navigate = useNavigate();
  useEffect(() => {
    checkResponse();
    //console.log("checkResponse");
  }, []);

  const [isLogged, setIsLogged] = useState(true); //todo в телеге есть статья с прелоадером
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleRegister = (data) => {
    const { email, password, name } = data;
    register(email, password, name)
      .then((response) => {
        localStorage.setItem("jwt", response.JWT);
        checkResponse();
        navigate("/movies");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  function handleSignout() {
    console.log("handleSignout");
    localStorage.removeItem("jwt");
    localStorage.removeItem("films");
    localStorage.removeItem("requset");
    localStorage.removeItem("short");
    setIsLogged(false);
  }

  function checkResponse() {
    if (localStorage.getItem("jwt")) {
      //console.log("+jwt");
      checkValidityToken(localStorage.getItem("jwt"))
        .then((res) => {
          setUserEmail(res.email);
          setUserName(res.name);
          setIsLogged(true);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
          setIsLogged(false);
        });
    } else {
      //console.log("-jwt");
      setIsLogged(false);
      navigate("/");
    }
  }

  function handleLogin(data) {
    const { email, password } = data;
    auth(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.JWT);
        setIsLogged(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsLogged(false);
      });
  }

  function handleChangeProfile(newName, newEmail) {
    api
      .updateUser(newName, newEmail)
      .then((res) => {
        console.log(res);
        setUserName(res.name);
        setUserEmail(res.email);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsLogged(false);
      });
  }

  //try to transfer functions to add or remove movies

  return (
    <LoggedStateContext.Provider
      value={{
        isLogged,
        setIsLogged,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
      }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/movies" element={<Movies />} />
            <Route
              path="/signup"
              element={<Register handleRegister={handleRegister} />}
            />
            <Route
              path="/signin"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="/saved-movies" element={<SavedMovies />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile
                    handleSignout={handleSignout}
                    handleChangeProfile={handleChangeProfile}
                  />
                </ProtectedRoute>
              }
            />
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
