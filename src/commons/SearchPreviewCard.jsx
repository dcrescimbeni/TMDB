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

  return (
    <Wrapper>
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
      {title}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Card = styled.img`
  width: 71px;
  border-radius: 10px;
`;

export default SearchPreviewCard;
