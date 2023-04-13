import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("id");
  const [token, setToken] = useState(initialToken);
  // const navigate = useNavigate();
  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("id", token);
    setTimeout(() => {
      localStorage.removeItem("id");
      // navigate("/")
      setToken(null);
    }, 300000);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("id");
  };
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
