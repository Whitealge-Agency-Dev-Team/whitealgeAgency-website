import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      try {
        // Try to fetch current user if token exists
        const token = localStorage.getItem('token');
        if (token) {
          const data = await api.get('/auth/me');
          setUser(data.user || null);
        }
      } catch (e) {
        // invalid token or 401
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    bootstrap();
  }, []);

  const login = async (email, password) => {
    const data = await api.post('/auth/login', { email, password }, { auth: false });
    if (data?.token) {
      localStorage.setItem('token', data.token);
      const me = await api.get('/auth/me');
      setUser(me.user || null);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  const value = useMemo(() => ({ user, setUser, login, logout, loading }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
