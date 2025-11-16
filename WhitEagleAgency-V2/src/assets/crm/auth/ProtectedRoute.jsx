import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ allow = [] }) {
  const { user, loading } = useAuth();

  if (loading) return null; // could render a spinner
  if (!user) return <Navigate to="/crm/login" replace />;

  if (allow.length > 0) {
    const roleCode = (user?.Role?.code || user?.role?.code || user?.role || '').toString().toUpperCase();
    if (!allow.includes(roleCode)) return <Navigate to="/crm/home" replace />;
  }

  return <Outlet />;
}
