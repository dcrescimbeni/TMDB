import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const Header = ({ user }) => {
  return (
    <HeaderWrapper>
      <div>
        <Link to="/">MUUBI</Link>
      </div>
      <div>Sign up / Log in</div>
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
