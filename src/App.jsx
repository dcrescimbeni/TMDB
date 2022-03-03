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
      <GlobalWrapper>
        <Routes>
          <Route
            path={'/'}
            element={
              <Slogan>
                Find <WordAccent>any</WordAccent> movie or TV show
              </Slogan>
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
      </GlobalWrapper>
    </AuthContextProvider>
  );
};

const WordAccent = styled.span`
  color: #9c1de7;
`;

const GlobalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Slogan = styled.h1`
  margin: 15px 10px;
  text-align: center;
`;

export default App;
