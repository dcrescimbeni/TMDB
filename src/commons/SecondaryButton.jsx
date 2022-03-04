import styled from 'styled-components/macro';

const SecondaryButton = ({ value, onClick, children }) => {
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
  color: #4e4e4e;
  font-weight: bold;
  background-color: #f7f7f7;
  border: 1px solid #9c1de7;
  padding: 0px 35px;
  margin: 0px 10px;
`;

export default SecondaryButton;
