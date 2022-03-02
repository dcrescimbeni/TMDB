import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import MediaCard from '../commons/MediaCard';

const MediaGrid = ({ mediaList }) => {
  return (
    <GridWrapper>
      {mediaList.map((item, index) => {
        return (
          <Link
            to={`/media/single/${item.id}?type=${item.media_type}`}
            key={index}
          >
            <MediaCard mediaDetails={item} />
          </Link>
        );
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
