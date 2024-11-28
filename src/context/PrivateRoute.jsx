import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
const PrivateRoute = ({ component: Component }) => {
  const user = useUser();
  return user ? <Component user={user} /> : <Navigate to="/" />;
};
export default PrivateRoute;
