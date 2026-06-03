// context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";
import { loginUser } from "../services/UserService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    // Au chargement, on récupère l'utilisateur sauvegardé
    try {
      const saved = localStorage.getItem("rgc_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (code, password) => {
    const result = loginUser(code, password);
    if (result.success) {
      setCurrentUser(result.user);
      localStorage.setItem("rgc_user", JSON.stringify(result.user));
    }
    return result;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("rgc_user");
    sessionStorage.removeItem("rgc_page");
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}