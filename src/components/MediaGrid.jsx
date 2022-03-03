import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import MediaCard from '../commons/MediaCard';

const MediaGrid = ({ mediaList, setMediaList, currentSearch }) => {
  return (
    <>
      <GridWrapper>
        {mediaList.map((item, index) => {
          return (
            <Link
              to={`/media/single/${item.id}?type=${item.media_type}`}
              key={index}
            >
              <MediaCard
                mediaDetails={item}
                mediaList={mediaList}
                setMediaList={setMediaList}
              />
            </Link>
          );
        })}
      </GridWrapper>
    </>
  );
};

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 30px;

  @media (min-width: 525px) {
    grid-template-columns: 1fr 1fr;
    gap: 25px;
  }

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default MediaGrid;
