/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import styled from 'styled-components/macro';
import { BiSearchAlt } from 'react-icons/bi';
import axios from 'axios';

import SearchResultsPreview from './SearchResultsPreview';

const SearchBar = ({ handleSubmit }) => {
  const searchQuery = useInput('');
  const [searchPreview, setSearchPreview] = useState([]);
  const [resultsPreviewIsVisible, setResultsPreviewIsVisible] = useState(false);
  const [focusSearchBar, setFocusSearchBar] = useState(false);
  const [timerId, setTimerId] = useState(0);

  useEffect(() => {
    if (focusSearchBar === true) {
      clearTimeout(timerId);
      setResultsPreviewIsVisible(true);
    }

    if (focusSearchBar === false) {
      let timer = setTimeout(() => {
        setResultsPreviewIsVisible(false);
      }, 150);
      setTimerId(timer);
    }
  }, [focusSearchBar]);

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

  return (
    <div
      onFocus={() => setFocusSearchBar(true)}
      onBlur={() => setFocusSearchBar(false)}
    >
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
      {resultsPreviewIsVisible ? (
        <SearchResultsPreview
          searchPreview={searchPreview}
          handleSubmit={handleSubmit}
          searchQuery={searchQuery}
        />
      ) : null}
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
