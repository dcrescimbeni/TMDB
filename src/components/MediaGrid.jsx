import styled from 'styled-components/macro';
import MediaCard from '../commons/MediaCard';

const MediaGrid = ({ searchResults }) => {
  return (
    <GridWrapper>
      {searchResults.map((item, index) => {
        return <MediaCard mediaDetails={item} key={index} />;
      })}
    </GridWrapper>
  );
};

const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 762px;
`;

export default MediaGrid;
