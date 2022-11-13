import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { LoggedStateContext } from "../../contexts/LoggedStateContext";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isLogged } = React.useContext(LoggedStateContext);
  //console.log(isLogged);
  if (!isLogged) {
    console.log("no logged");
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
}

export default ProtectedRoute;
