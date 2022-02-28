import React, { useState } from 'react';
import styled from 'styled-components/macro';
import GlobalStyles from './GlobalStyles';
import Header from './components/Header';
import SearchBar from './commons/SearchBar';

const App = () => {
  const [user, setUser] = useState('dinocrescimbeni');

  return (
    <>
      <Header user={user} />
      <h1>
        Find <WordAccent>any</WordAccent> movie or TV show
      </h1>
      <SearchBar />
      <GlobalStyles />
    </>
  );
};

const WordAccent = styled.span`
  color: #9c1de7;
`;

export default App;
