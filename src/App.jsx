import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import styled from 'styled-components/macro';
import GlobalStyles from './GlobalStyles';
import Header from './components/Header';
import SearchBar from './commons/SearchBar';
import Content from './components/Content';
import MediaDetails from './components/MediaDetails';

const App = () => {
  const [user, setUser] = useState('dinocrescimbeni');
  let navigate = useNavigate();

  const handleSubmit = (event, query) => {
    event.preventDefault();
    navigate(`/media/search?query=${query}`);
  };

  return (
    <>
      <GlobalStyles />
      <Header user={user} />
      <h1>
        Find <WordAccent>any</WordAccent> movie or TV show
      </h1>
      <SearchBar handleSubmit={handleSubmit} />
      <Routes>
        <Route path="/media/search" element={<Content />} />
        <Route path="/media/single/:id" element={<MediaDetails />} />
      </Routes>
    </>
  );
};

const WordAccent = styled.span`
  color: #9c1de7;
`;

export default App;
