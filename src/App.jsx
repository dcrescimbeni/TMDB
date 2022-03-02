import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import styled from 'styled-components/macro';
import GlobalStyles from './GlobalStyles';
import Header from './components/Header';
import SearchBar from './commons/SearchBar';
import Content from './components/Content';
import MediaDetails from './components/MediaDetails';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AuthContextProvider from './AuthContext';
import FavoritesList from './components/FavoritesList';

const App = () => {
  let navigate = useNavigate();

  const handleSubmit = (event, query) => {
    event.preventDefault();
    navigate(`/media/search?query=${query}`);
  };

  return (
    <AuthContextProvider>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route
          path={'/'}
          element={
            <h1>
              Find <WordAccent>any</WordAccent> movie or TV show
            </h1>
          }
        />
      </Routes>

      <SearchBar handleSubmit={handleSubmit} />
      <Routes>
        <Route path="/media/search" element={<Content />} />
        <Route path="/media/single/:id" element={<MediaDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/user/:username" element={<FavoritesList />} />
      </Routes>
    </AuthContextProvider>
  );
};

const WordAccent = styled.span`
  color: #9c1de7;
`;

export default App;
