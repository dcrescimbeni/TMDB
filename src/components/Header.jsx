import { useContext } from 'react';
import styled from 'styled-components/macro';
import { Link, useNavigate } from 'react-router-dom';

import MainButton from '../commons/MainButton';
import SecondaryButton from '../commons/SecondaryButton';
import { AuthContext } from '../AuthContext';

const Header = ({ user }) => {
  const userDetails = useContext(AuthContext);
  const navigate = useNavigate();

  const signupClickHandle = () => {
    navigate('/signup');
  };

  const loginClickHandle = () => {
    navigate('/login');
  };

  return (
    <HeaderWrapper>
      <div>
        <Link to="/">MUUBI</Link>
      </div>
      {userDetails.user ? (
        userDetails.user
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

export default Header;
