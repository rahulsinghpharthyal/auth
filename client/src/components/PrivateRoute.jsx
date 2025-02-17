import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const user  = useSelector(selectCurrentUser);
  return user ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
