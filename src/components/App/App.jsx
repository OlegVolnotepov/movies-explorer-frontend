import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import Main from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { Register } from "../Register/Register";
import { NotFound } from "../NotFound/NotFound";
import { Login } from "../Login/Login";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";
import { Profile } from "../Profile/Profile";

function App() {
  return (
    <LoggedStateContext.Provider value={true}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/saved-movies" element={<SavedMovies />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </LoggedStateContext.Provider>
  );
}

export default App;
