import styled from 'styled-components/macro';

import noPosterAvailable from '../assets/noPosterAvailable.jpg';

const SearchPreviewCard = ({ mediaItem, setFocusSearchBar }) => {
  let title;

  if (mediaItem.media_type === 'movie') {
    title = mediaItem.original_title;
  } else if (mediaItem.media_type === 'tv') {
    title = mediaItem.name;
  } else {
    title = null;
  }

  let shortenedOverview;

  if (!mediaItem.overview) {
    shortenedOverview = '';
  } else if (mediaItem.overview.length > 120) {
    shortenedOverview = mediaItem.overview.substring(0, 140) + '...';
  } else {
    shortenedOverview = mediaItem.overview;
  }

  return (
    <Wrapper
      onClick={() => {
        setFocusSearchBar(false);
      }}
    >
      <CardWrapper>
        {mediaItem.poster_path ? (
          <Card
            src={`http://image.tmdb.org/t/p/w92${mediaItem.poster_path}`}
            alt={`${mediaItem.original_title || mediaItem.name} poster`}
          />
        ) : (
          <Card
            src={noPosterAvailable}
            alt={`${
              mediaItem.original_title || mediaItem.name
            } poster not available`}
          />
        )}
      </CardWrapper>
      <div>
        <Title>{title}</Title>
        <Description>{shortenedOverview}</Description>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
`;
const CardWrapper = styled.div`
  min-width: 71px;
  max-width: 71px;
  margin: 0px 34px;
`;

const Card = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const Title = styled.h5`
  color: #581b98;
`;

const Description = styled.p`
  color: #4e4e4e;
`;

export default SearchPreviewCard;
