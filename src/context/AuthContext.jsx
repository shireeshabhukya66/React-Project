import { createContext, useState } from "react";    //Store logged-in user globally

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {     //It runs only once when component loads(lazy initialization)
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = userData => {       //saves user
    setUser(userData);              //Updates global state
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {                //clear user
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    //Available globally
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}