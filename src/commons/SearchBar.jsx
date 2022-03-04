import { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import styled from 'styled-components/macro';
import { BiSearchAlt } from 'react-icons/bi';
import axios from 'axios';

import SearchResultsPreview from './SearchResultsPreview';

const SearchBar = ({ handleSubmit }) => {
  const searchQuery = useInput('');
  const [fullSearchResults, setFullSearchResults] = useState([]);
  const [searchPreview, setSearchPreview] = useState([]);
  const [resultsPreviewIsVisible, setResultsPreviewIsVisible] = useState(false);
  const [focusSearchBar, setFocusSearchBar] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const [selectedButton, setSelectedButton] = useState('all-btn');
  const [isSearchingUsers, setIsSearchingUsers] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusSearchBar]);

  useEffect(() => {
    if (searchQuery.value.length > 3) {
      if (isSearchingUsers) {
        axios
          .get(`/api/users/search?query=${searchQuery.value}`)
          .then((res) => res.data)
          .then((users) => setFullSearchResults(users));
      } else {
        axios
          .get(`/api/media/search?query=${searchQuery.value}`)
          .then((res) => res.data)
          .then((results) => {
            let filterMovieAndTV = results.filter((result) => {
              return (
                result.media_type === 'movie' || result.media_type === 'tv'
              );
            });
            setFullSearchResults(filterMovieAndTV);
          });
      }
    }
  }, [searchQuery.value, isSearchingUsers]);

  useEffect(() => {
    let filterByType = fullSearchResults.map((media) => {
      if (selectedButton === 'all-btn') return media;
      if (selectedButton === 'movies-btn' && media.media_type === 'movie') {
        return media;
      }
      if (selectedButton === 'tv-btn' && media.media_type === 'tv') {
        return media;
      }
      if (selectedButton === 'users-btn') {
        return media;
      }
      return null;
    });

    let topThreeResults = filterByType.slice(0, 3);
    setSearchPreview(topThreeResults);
  }, [fullSearchResults, selectedButton]);

  return (
    <Wrapper
      onFocus={() => setFocusSearchBar(true)}
      onBlur={() => setFocusSearchBar(false)}
    >
      <form
        autoComplete="off"
        onSubmit={(event) => {
          handleSubmit(event, searchQuery.value);
          setFocusSearchBar(false);
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
          isSearchingUsers={isSearchingUsers}
          setIsSearchingUsers={setIsSearchingUsers}
        />
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 60px;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 630px) {
    margin-top: 40px;
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;

const SearchInput = styled.input`
  height: 50px;
  border-radius: 30px;
  padding-left: 55px;
  border: 2px solid #9c1de7;
  margin-left: -50px;

  &:focus {
    outline: none;
  }

  @media (min-width: 600px) {
    width: 580px;
  }
`;

export default SearchBar;
