import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import MainButton from './MainButton.jsx';
import SearchPreviewCard from './SearchPreviewCard.jsx';

const SearchResultsPreview = ({ searchPreview, handleSubmit, searchQuery }) => {
  return (
    <Wrapper>
      <Triangle></Triangle>
      <ResultsWrapper>
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
