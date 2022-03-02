import useInput from '../hooks/useInput';
import styled from 'styled-components/macro';
import { BiSearchAlt } from 'react-icons/bi';

const SearchBar = ({ handleSubmit }) => {
  const searchQuery = useInput('');

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit(event, searchQuery.value);
        }}
      >
        <SearchBarWrapper>
          <SearchInput
            type="text"
            name="search"
            {...searchQuery}
            placeholder="Search..."
          />
          <BiSearchAlt color="#9c1de7" size="2rem" />
        </SearchBarWrapper>
      </form>
    </div>
  );
};

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;

const SearchInput = styled.input`
  width: 580px;
  height: 50px;
  border-radius: 30px;
  padding-left: 55px;
  border: 2px solid #9c1de7;
  margin-left: -50px;

  &:focus {
    outline: none;
  }
`;

export default SearchBar;
