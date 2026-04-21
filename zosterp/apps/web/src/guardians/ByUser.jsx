import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

export const ByUser = ({ children, mustLogged = false, redirectTo = "/" }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;

  const isAuthenticated = !!user;
  if (mustLogged && !isAuthenticated) return <Navigate to="/auth/login" replace />;

  if (!mustLogged && isAuthenticated)
    return <Navigate to={redirectTo} replace />;

  return children;
};
