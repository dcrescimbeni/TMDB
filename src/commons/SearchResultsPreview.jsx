import { useState } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';

import MainButton from './MainButton.jsx';
import SearchPreviewCard from './SearchPreviewCard.jsx';

const SearchResultsPreview = ({
  searchPreview,
  handleSubmit,
  searchQuery,
  setFocusSearchBar,
  selectedButton,
  setSelectedButton,
  isSearchingUsers,
  setIsSearchingUsers,
}) => {
  const handleFilterButtonClick = (e) => {
    setSelectedButton(e.target.name);
    if (e.target.name === 'users-btn') setIsSearchingUsers(true);
    else setIsSearchingUsers(false);
  };

  return (
    <Wrapper>
      <Triangle></Triangle>
      <ResultsWrapper>
        <FilterButtonsWrapper>
          <FilterButton
            name="all-btn"
            selected={selectedButton}
            onClick={handleFilterButtonClick}
          >
            All
          </FilterButton>
          <FilterButton
            name="movies-btn"
            selected={selectedButton}
            onClick={handleFilterButtonClick}
          >
            Movies
          </FilterButton>
          <FilterButton
            name="tv-btn"
            selected={selectedButton}
            onClick={handleFilterButtonClick}
          >
            TV
          </FilterButton>
          <FilterButton
            name="users-btn"
            selected={selectedButton}
            onClick={handleFilterButtonClick}
          >
            Users
          </FilterButton>
        </FilterButtonsWrapper>

        <SearchPreviewWrapper
          onClick={() => {
            setFocusSearchBar(false);
          }}
        >
          {searchPreview.map((item, index) => {
            if (!item) return null;
            if (item.originalUsername) {
              console.log(item);
              return (
                <Link to={`/users/user/${item.username}`}>
                  <UserCard>
                    <BiUser size={'2rem'} />
                    <h5>{item.originalUsername}</h5>
                  </UserCard>
                </Link>
              );
            }
            console.log(item);
            return (
              <Link
                to={`/media/single/${item.id}?type=${item.media_type}`}
                key={index}
              >
                <SearchPreviewCard mediaItem={item} />
              </Link>
            );
          })}
        </SearchPreviewWrapper>
        <MainButton
          onClick={(event) => {
            handleSubmit(event, searchQuery.value);
            setFocusSearchBar(false);
          }}
        >
          More results
        </MainButton>
      </ResultsWrapper>
    </Wrapper>
  );
};

export default SearchResultsPreview;

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid #f6f6f6;
  margin: auto;
  margin-top: 10px;
`;

const FilterButtonsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-left: 65px;
  margin-bottom: 5px;
`;

const FilterButton = styled.button`
  padding: 10px 25px;
  border: none;
  color: #9c1de7;
  background-color: #f6f6f6;
  ${(props) => {
    if (props.selected === props.name)
      return `border-bottom: 5px solid #9c1de7;
      font-weight: bold;`;
  }}

  &:hover {
    cursor: pointer;
  }
`;

const SearchPreviewWrapper = styled.div`
  margin-bottom: 10px;
`;

const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 580px;
  border-radius: 20px;
  background-color: #f6f6f6;
  padding: 30px;
  margin-left: -17px;
`;

const UserCard = styled.div`
  display: flex;
  margin: 15px 0px;
  padding: 20px;
  width: 100%;
  border-bottom: 2px solid #9c1de7;
  align-items: center;
`;

const Username = styled.h5``;
