"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { fetchCurrentUser, loginUser as apiLogin, logoutUser as apiLogout, registerUser as apiRegister } from "@/frontend/services/authService";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  refreshUser: async () => {},
  register: async () => {},
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchCurrentUser();
      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (credentials) => {
    const data = await apiLogin(credentials);
    await refreshUser();
    return data;
  };

  const register = async (credentials) => {
    const data = await apiRegister(credentials);
    await refreshUser();
    return data;
  };

  const logout = async () => {
    const data = await apiLogout();
    setUser(null);
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        refreshUser,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
