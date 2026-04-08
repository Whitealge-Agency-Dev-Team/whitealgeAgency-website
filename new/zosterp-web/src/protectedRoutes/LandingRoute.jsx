import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const AuthRoute = ({children}) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/profile" replace />;
  return children;
};

export default AuthRoute;
