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
  const [selectedButton, setSelectedButton] = useState('all-btn');

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
          let filterMovieAndTV = results.filter((result) => {
            return result.media_type === 'movie' || result.media_type === 'tv';
          });

          let filterByType = filterMovieAndTV.map((media) => {
            if (selectedButton === 'all-btn') return media;

            if (
              selectedButton === 'movies-btn' &&
              media.media_type === 'movie'
            ) {
              return media;
            }

            if (selectedButton === 'tv-btn' && media.media_type === 'tv') {
              return media;
            }
          });

          let topThreeResults = filterByType.slice(0, 3);
          setSearchPreview(topThreeResults);
          console.log(topThreeResults);
        });
    }
  }, [searchQuery.value, selectedButton]);

  return (
    <div
      onFocus={() => setFocusSearchBar(true)}
      onBlur={() => setFocusSearchBar(true)}
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
          setFocusSearchBar={setFocusSearchBar}
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
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
