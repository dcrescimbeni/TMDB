import { useContext, useState } from 'react';
import styled from 'styled-components/macro';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiUser } from 'react-icons/bi';
import { BiLogOutCircle } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';

import { AuthContext } from '../AuthContext';

const Header = () => {
  const userDetails = useContext(AuthContext);
  const navigate = useNavigate();
  const [isTooltipVisible, setIsTooltipVisible] = useState('hidden');

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

    axios
      .get(`${process.env.SERVER_URL}/api/logout`)
      .then(() => userDetails.toggleAuth(null, false));
  };

  return (
    <HeaderWrapper>
      <div>
        <Link to="/">
          <Logo>FLIM!</Logo>
        </Link>
      </div>
      {userDetails.user ? (
        <ButtonsWrapper>
          <ProfileButtonWrapper>
            <BiUser size={'1.5rem'} color={'#9c1de7'} />
            <ProfileButton onClick={showUserOptions}>
              {userDetails.user}▼
            </ProfileButton>
          </ProfileButtonWrapper>
          <UserOptions visible={isTooltipVisible}>
            <UserOptionsButtonWrapper>
              <AiFillHeart size={'1.25rem'} />
              <OptionButtons onClick={favoritesClickHandle}>
                Favorites
              </OptionButtons>
            </UserOptionsButtonWrapper>
            <UserOptionsButtonWrapper>
              <BiLogOutCircle size={'1.25rem'} />
              <OptionButtons onClick={logoutClickHandle}>Logout</OptionButtons>
            </UserOptionsButtonWrapper>
          </UserOptions>
        </ButtonsWrapper>
      ) : (
        <div>
          <LoginButton onClick={loginClickHandle}>Log in</LoginButton>
          <SignupButton onClick={signupClickHandle}>Sign up</SignupButton>
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
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const UserOptions = styled.div`
  visibility: ${(props) => props.visible};
  position: absolute;
  background-color: #f6f6f6;
  padding: 15px;
  margin-top: 40px;
  border-radius: 10px;
  width: 150px;
`;

const Logo = styled.p`
  font-weight: bold;
`;

const ProfileButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileButton = styled.button`
  color: #9c1de7;
  border-radius: 5px;
  border: none;
  margin-left: 5px;
  padding: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const UserOptionsButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;

  &:hover {
    color: #581b98;
    background-color: #e3e3e3;
  }

  &:first-child {
    border-bottom: 3px solid #e3e3e3;
  }
`;

const OptionButtons = styled.button`
  background-color: #f6f6f6;
  border: none;
  color: inherit;
  padding: 10px 5px;
  text-align: left;
  width: 100%;

  &:hover {
    cursor: pointer;
    background-color: #e3e3e3;
  }
`;

const SignupButton = styled.button`
  background-color: #9c1de7;
  color: #f6f6f6;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 2px 15px;
  margin-left: 10px;

  @media (min-width: 630px) {
    margin-left: 25px;
  }
`;

const LoginButton = styled.button`
  background-color: transparent;
  color: #9c1de7;
  border: none;
  border-bottom: 2px solid #9c1de7;
  padding: 2px 10px;
`;

export default Header;
