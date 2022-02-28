import React, { useState } from 'react';
import styled from 'styled-components/macro';
import GlobalStyles from './GlobalStyles';
import Header from './components/Header';
import SearchBar from './commons/SearchBar';
import Content from './components/Content';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState('dinocrescimbeni');
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = (event, query) => {
    event.preventDefault();
    axios
      .get(`/api/media/search?query=${query}`)
      .then((res) => res.data)
      .then((movies) => {
        console.log(movies);
        setSearchResults(movies);
      });
  };

  return (
    <>
      <Header user={user} />
      <h1>
        Find <WordAccent>any</WordAccent> movie or TV show
      </h1>
      <SearchBar
        setSearchResults={setSearchResults}
        handleSubmit={handleSubmit}
      />
      <Content searchResults={searchResults} />
      <GlobalStyles />
    </>
  );
};

const WordAccent = styled.span`
  color: #9c1de7;
`;

export default App;

//TODO: Fix bug - multisearch: get only tv and movies;ASDFASEDFG ASDF AS
