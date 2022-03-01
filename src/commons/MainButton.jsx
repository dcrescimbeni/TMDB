import styled from 'styled-components/macro';

const MainButton = ({ value, onClick, children }) => {
  return (
    <Button type="button" value={value} onClick={onClick}>
      {children}
    </Button>
  );
};

const Button = styled.button`
  height: 45px;
  background-color: #9c1de7;
  border-radius: 5px;
  font-weight: bold;
  color: #f6f6f6;
  border: 1px #9c1de7;
  padding: 0px 35px;
  margin: 0px 10px;

  &:hover {
    cursor: pointer;
  }
`;

export default MainButton;
