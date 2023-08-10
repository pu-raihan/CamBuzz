import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "https://cambuzz.onrender.com/api/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );
    setCurrentUser(res.data);
  };

  const facLogin = async (inputs) => {
    const res = await axios.post(
      "https://cambuzz.onrender.com/api/auth/faclogin",
      inputs,
      {
        withCredentials: true,
      }
    );
    setCurrentUser(res.data);
  };

  const update = async (username) => {
    const res = await axios.post(
<<<<<<< HEAD
      "https://cambuzz.onrender.com/api/auth/update?username=" + username
=======
      "https://cambuzz.onrender.comapi/auth/update?username=" + username
>>>>>>> 891a828c89ea96e18ddc6a521501bb5aa02036aa
    );
    setCurrentUser(res.data);
  };
  const logout = async () => {
<<<<<<< HEAD
    await axios.post("http://cambuzz.onrender.com/api/auth/logout");
=======
    await axios.post("https://cambuzz.onrender.com/api/auth/logout");
>>>>>>> 891a828c89ea96e18ddc6a521501bb5aa02036aa
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
