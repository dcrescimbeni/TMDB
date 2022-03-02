import { useContext, useState } from 'react';
import styled from 'styled-components/macro';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import MainButton from '../commons/MainButton';
import SecondaryButton from '../commons/SecondaryButton';
import { AuthContext } from '../AuthContext';

const Header = () => {
  const userDetails = useContext(AuthContext);
  const navigate = useNavigate();
  const [isTooltipVisible, setIsTooltipVisible] = useState('hidden');

  UserOptions.defaultProps = {
    isTooltipVisible,
  };

  const signupClickHandle = () => {
    navigate('/signup');
  };

  const loginClickHandle = () => {
    navigate('/login');
  };

  const showUserOptions = () => {
    isTooltipVisible === 'hidden'
      ? setIsTooltipVisible('visible')
      : setIsTooltipVisible('hidden');
  };

  const favoritesClickHandle = () => {
    setIsTooltipVisible('hidden');
    navigate(`/users/user/${userDetails.user}`);
  };

  const logoutClickHandle = () => {
    setIsTooltipVisible('hidden');

    axios.get('/api/logout').then(() => userDetails.toggleAuth(null));
  };

  return (
    <HeaderWrapper>
      <div>
        <Link to="/">MUUBI</Link>
      </div>
      {userDetails.user ? (
        <div>
          <button onClick={showUserOptions}>{userDetails.user}</button>
          <UserOptions>
            <button onClick={favoritesClickHandle}>Favorites</button>
            <button onClick={logoutClickHandle}>Logout</button>
          </UserOptions>
        </div>
      ) : (
        <div>
          <SecondaryButton onClick={loginClickHandle}>Log in</SecondaryButton>
          <MainButton onClick={signupClickHandle}>Sign up</MainButton>
        </div>
      )}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 12px 24px;
`;

const UserOptions = styled.div`
  visibility: ${(props) => props.isTooltipVisible};
  /* visibility: ${(props) => props.isTooltipVisible}; */
`;

export default Header;
