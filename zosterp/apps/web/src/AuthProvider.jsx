import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken && savedUser) {
          setAccessToken(savedToken);
          setUser(JSON.parse(savedUser));
          axios.defaults.headers.common["Authorization"] =
            `Bearer ${savedToken}`;
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    initAuth();
  }, []);

  const handleAuthResponse = (data) => {
    const { user, accessToken } = data;
    if (accessToken) {
      setUser(user);
      setAccessToken(accessToken);
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user)); // Guardamos el user también
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      handleAuthResponse(response.data);
      return response.data;
    } catch (error) {
      const info = error.response?.data?.info;
      const key = Object.keys(info)[0];
      setError(info[key] || "internal_server_error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      handleAuthResponse(response.data);
      return response.data;
    } catch (error) {
      const info = error.response?.data?.info;
      const key = Object.keys(info)[0];
      setError(info[key] || "internal_server_error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/refresh`);
      const { accessToken } = response.data;
      if (accessToken) {
        setAccessToken(accessToken);
        localStorage.setItem("token", accessToken);
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${accessToken}`;
      }
      return response.data;
    } catch (error) {
      const info = error.response?.data?.info;
      const key = Object.keys(info)[0];
      setError(info[key] || "internal_server_error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${API_URL}/auth/logout`);
    } catch (e) {
      console.error("Error logging out from server", e);
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const auth2fa = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/2FA`, userData);
      handleAuthResponse(response.data);
      return response.data;
    } catch (error) {
      const info = error.response?.data?.info;
      const key = Object.keys(info)[0];
      setError(info[key] || "internal_server_error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const requestNewPw = async (email) => {
    try {
      await axios.post(`${API_URL}/auth/password`, email);
      return { success: true, ...response.data };
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        requestNewPw,
        auth2fa,
        clearError,
        user,
        loading,
        error,
        accessToken,
        login,
        logout,
        register,
        refresh,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
