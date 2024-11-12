import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const loggedinUser = localStorage.getItem("user");
    if (loggedinUser) {
      setUser(JSON.parse(loggedinUser));
    }
  }, []);

  useEffect(() => {
    if (user.username) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
