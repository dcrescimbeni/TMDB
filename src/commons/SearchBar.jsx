import { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import styled from 'styled-components/macro';
import { BiSearchAlt } from 'react-icons/bi';
import axios from 'axios';

import SearchPreviewCard from './SearchPreviewCard';

const SearchBar = ({ handleSubmit }) => {
  const searchQuery = useInput('');
  const [searchPreview, setSearchPreview] = useState([]);

  useEffect(() => {
    if (searchQuery.value.length > 3) {
      axios
        .get(`/api/media/search?query=${searchQuery.value}`)
        .then((res) => res.data)
        .then((results) => {
          setSearchPreview(results);
          console.log(results);
        });
    }
  }, [searchQuery.value]);

  return (
    <div>
      <form
        autoComplete="off"
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
      <SearchResultsPreview>
        <div>All - Movies - TV - Users</div>
        <div>
          {searchPreview.map((item) => {
            return <SearchPreviewCard mediaItem={item} />;
          })}
        </div>
      </SearchResultsPreview>
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

const SearchResultsPreview = styled.div`
  width: 580px;
  border-radius: 20px;
  background-color: #f6f6f6;
`;

export default SearchBar;
