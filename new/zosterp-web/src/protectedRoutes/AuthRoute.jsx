import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const AuthRoute = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/profile" replace />;
  return <Outlet />;
};

export default AuthRoute;
