import React from "react";
import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";
import { Preloader } from "../Preloader/Preloader";

function ProtectedRoute({ children, preloading }) {
  const location = useLocation();
  const { isLogged } = React.useContext(LoggedStateContext);

  if (isLogged === undefined) {
    return <Preloader />;
  } else {
    if (!isLogged) {
      return <Navigate to="/" state={{ from: location }} />;
    }
    return children;
  }
}

export default ProtectedRoute;
