import React, { useState } from 'react';
import GlobalStyles from './GlobalStyles';
import Header from './components/Header';

const App = () => {
  const [user, setUser] = useState('dinocrescimbeni');

  return (
    <>
      <Header user={user} />
      <h1>The Movie Database</h1>
      <GlobalStyles />
    </>
  );
};

export default App;
