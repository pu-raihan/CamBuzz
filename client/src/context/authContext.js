import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "https://cambuzz-api.onrender.com/api/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );
    setCurrentUser(res.data);
  };

  const facLogin = async (inputs) => {
    const res = await axios.post(
      "https://cambuzz-api.onrender.com/api/auth/faclogin",
      inputs,
      {
        withCredentials: true,
      }
    );
    setCurrentUser(res.data);
  };

  const update = async (username) => {
    const res = await axios.post(
      "https://cambuzz-api.onrender.com/api/auth/update?username=" + username
    );
    setCurrentUser(res.data);
  };
  const logout = async () => {
    await axios.post("https://cambuzz-api.onrender.com/api/auth/logout");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, facLogin, update, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
