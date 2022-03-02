import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import MainButton from './MainButton.jsx';
import SearchPreviewCard from './SearchPreviewCard.jsx';

const SearchResultsPreview = ({ searchPreview, handleSubmit, searchQuery }) => {
  return (
    <Wrapper>
      <div>All - Movies - TV - Users</div>

      <div>
        {searchPreview.map((item, index) => {
          return (
            <Link
              to={`/media/single/${item.id}?type=${item.media_type}`}
              key={index}
            >
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
    </Wrapper>
  );
};

export default SearchResultsPreview;

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 580px;
  border-radius: 20px;
  background-color: #f6f6f6;
  padding: 30px;
`;
