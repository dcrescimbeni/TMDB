import styled from 'styled-components/macro';

const InputField = ({ type, name, id, value, onChange, placeholder }) => {
  return (
    <Input
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

const Input = styled.input`
  max-width: 340px;
  border: 1px solid #9c1de7;
  border-radius: 10px;
  padding: 10px 15px;
  margin: 5px 0px;
  color: #4e4e4e;

  /* &:focus {
    border: 2px solid #581b98;
  } */
`;

export default InputField;
