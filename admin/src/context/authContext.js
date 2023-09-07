import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "https://cambuzz-api.onrender.com/api/auth/adminlogin",
      inputs,
      {
        withCredentials: true,
      }
    );
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post("https://cambuzz-api.onrender.com/api/auth/logout");
    localStorage.removeItem("admin");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
