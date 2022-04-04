import React, { useState, useEffect } from 'react';

const AuthInitialState = {
  user: null, // información del usuario
  isAuthenticated: false, // si está o no logueado
  toggleAuth: () => null, // función para actualizar el contexto
};

export const AuthContext = React.createContext(AuthInitialState);

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    console.log(isLoggedIn);
    const initialUserDetails = localStorage.getItem('userContext');
    setIsLoggedIn(JSON.parse(initialUserDetails));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAuth = (user, state) => {
    let userDetails = {
      user: user,
      isAuthenticated: state,
    };

    localStorage.setItem('userContext', JSON.stringify(userDetails));
    setIsLoggedIn(userDetails);
  };

  return (
    <AuthContext.Provider value={{ ...isLoggedIn, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
