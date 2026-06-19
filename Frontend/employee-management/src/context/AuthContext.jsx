import { createContext, useContext, useState, useCallback } from "react";
import { login as loginApi } from "../api/employeeApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // Backend returns { token } from POST /api/login
  // We decode the username from the token payload for display purposes
  const [user, setUser] = useState(() => {
    try {
      const t = localStorage.getItem("token");
      if (!t) return null;
      const payload = JSON.parse(atob(t.split(".")[1]));
      return { username: payload.username ?? payload.name ?? payload.sub ?? "User" };
    } catch {
      return null;
    }
  });

  const login = useCallback(async (credentials) => {
    const res = await loginApi(credentials);
    const jwt = res.data.token ?? res.data.accessToken ?? res.data;
    localStorage.setItem("token", jwt);
    // Decode username from JWT payload
    try {
      const payload = JSON.parse(atob(jwt.split(".")[1]));
      const userData = { username: payload.username ?? payload.name ?? payload.sub ?? credentials.username };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch {
      setUser({ username: credentials.username });
    }
    setToken(jwt);
    return res;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
