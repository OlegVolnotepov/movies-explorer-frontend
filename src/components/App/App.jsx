import "./App.css";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
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

  const [isLogged, setIsLogged] = useState(undefined);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [preloading, setPreloading] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [jwtState, setJwtState] = useState("");

  let location = useLocation();

  const handleRegister = (data) => {
    const { email, password, name } = data;
    register(email, password, name)
      .then((response) => {
        auth(email, password)
          .then((response) => {
            localStorage.setItem("jwt", response.JWT);
            checkResponse();
          })
          .catch((err) => {
            setRegisterMessage(err);
          })
          .finally(() => {});
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setRegisterMessage(`Ошибка: ${err}`);
      })
      .finally(() => {
        checkResponse();
        setTimeout(() => {
          setRegisterMessage("");
        }, 2000);
        setTimeout(() => {
          navigate("/movies");
        }, 2000);
      });
  };

  function handleSignout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("films");
    localStorage.removeItem("requset");
    localStorage.removeItem("short");
    localStorage.removeItem("shortSaved");
    setUserName("");
    setUserEmail("");
    setIsLogged(false);
  }

  function handleChangeProfile(newName, newEmail) {
    setPreloading(true);
    api
      .updateUser(newName, newEmail)
      .then((res) => {
        setUserName(res.name);
        setUserEmail(res.email);
        setProfileMessage("Данные обновлены");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setProfileMessage(`Ошибка: ${err}`);
      })
      .finally(() => {
        setPreloading(false);
        setTimeout(() => {
          setProfileMessage("");
        }, 2000);
      });
  }

  function handleLogin(data) {
    const { email, password } = data;
    auth(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.JWT);
        setJwtState("res.JWT");
        setIsLogged(true);
        setTimeout(() => {
          navigate("/movies");
        }, 1000);
      })
      .catch((err) => {
        setIsLogged(false);
        setLoginMessage(`Ошибка: ${err}`);
      })
      .finally(() => {
        setTimeout(() => {
          setLoginMessage("");
        }, 2000);
      });
  }

  function checkResponse() {
    if (localStorage.getItem("jwt")) {
      setPreloading(true);
      checkValidityToken(localStorage.getItem("jwt"))
        .then((res) => {
          setUserEmail(res.email);
          setUserName(res.name);
          setIsLogged(true);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
          handleSignout();
        })
        .finally(() => {
          setPreloading(false);
        });
    } else {
      setIsLogged(false);
      handleSignout();

      if (location.pathname !== "/signin" && location.pathname !== "/signup") {
        navigate("/");
      }
    }
  }

  useEffect(() => {
    checkResponse();
  }, []);

  return (
    <LoggedStateContext.Provider
      value={{
        isLogged,
        setIsLogged,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        jwtState,
        setJwtState,
      }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute preloading={preloading}>
                  <Movies checkResponse={checkResponse} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  handleRegister={handleRegister}
                  preloading={preloading}
                  registerMessage={registerMessage}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login handleLogin={handleLogin} loginMessage={loginMessage} />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute preloading={preloading}>
                  <SavedMovies checkResponse={checkResponse} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute preloading={preloading}>
                  <Profile
                    handleSignout={handleSignout}
                    handleChangeProfile={handleChangeProfile}
                    preloading={preloading}
                    profileMessage={profileMessage}
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
