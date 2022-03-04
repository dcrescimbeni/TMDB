import styled from 'styled-components/macro';

import noPosterAvailable from '../assets/noPosterAvailable.jpg';

const SearchPreviewCard = ({ mediaItem }) => {
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
    <Wrapper>
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
  width: 100%;
  margin: 0px;
  padding-bottom: 20px;

  @media (min-width: 630px) {
    margin-bottom: 15px;
  }
`;
const CardWrapper = styled.div`
  margin-right: 20px;
  min-width: 92px;
  max-width: 92px;

  @media (min-width: 630px) {
    min-width: 71px;
    max-width: 71px;
  }
`;

const Card = styled.img`
  border-radius: 10px;
`;

const Title = styled.h5`
  color: #581b98;
`;

const Description = styled.p`
  color: #4e4e4e;
  display: none;

  @media (min-width: 630px) {
    display: contents;
  }
`;

export default SearchPreviewCard;
