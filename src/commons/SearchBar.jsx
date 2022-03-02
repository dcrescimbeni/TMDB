import { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import styled from 'styled-components/macro';
import { BiSearchAlt } from 'react-icons/bi';
import axios from 'axios';
import { Link } from 'react-router-dom';

import SearchPreviewCard from './SearchPreviewCard';
import MainButton from './MainButton.jsx';

const SearchBar = ({ handleSubmit }) => {
  const searchQuery = useInput('');
  const [searchPreview, setSearchPreview] = useState([]);

  useEffect(() => {
    if (searchQuery.value.length > 3) {
      axios
        .get(`/api/media/search?query=${searchQuery.value}`)
        .then((res) => res.data)
        .then((results) => {
          let filteredResults = results.filter((result) => {
            return result.media_type === 'movie' || result.media_type === 'tv';
          });
          let topThreeResults = filteredResults.slice(0, 3);
          setSearchPreview(topThreeResults);
          console.log(topThreeResults);
        });
    }
  }, [searchQuery.value]);

  const moreResultsHandle = () => {};

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
            return (
              <Link to={`/media/single/${item.id}?type=${item.media_type}`}>
                <SearchPreviewCard mediaItem={item} />
              </Link>
            );
          })}
        </div>
        <MainButton
          onClick={(event) => {
            handleSubmit(event, searchQuery.value);
          }}
        >
          More results
        </MainButton>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 580px;
  border-radius: 20px;
  background-color: #f6f6f6;
  padding: 30px;
`;

export default SearchBar;
