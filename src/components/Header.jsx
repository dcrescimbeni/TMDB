import styled from 'styled-components/macro';
import { Link, useNavigate } from 'react-router-dom';

import MainButton from '../commons/MainButton';
import SecondaryButton from '../commons/SecondaryButton';

const Header = ({ user }) => {
  const navigate = useNavigate();

  const signupClickHandle = () => {
    navigate('/users/new');
  };

  return (
    <HeaderWrapper>
      <div>
        <Link to="/">MUUBI</Link>
      </div>
      <div>
        <SecondaryButton value={'Log in'} onClick={() => console.log('works')}>
          Log in
        </SecondaryButton>
        <MainButton value={'Log in'} onClick={signupClickHandle}>
          Sign up
        </MainButton>
      </div>
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
