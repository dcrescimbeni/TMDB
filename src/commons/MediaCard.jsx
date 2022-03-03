import { useContext } from 'react';
import styled from 'styled-components/macro';

import noPosterAvailable from '../assets/noPosterAvailable.jpg';
import { AuthContext } from '../AuthContext';
import FavoriteButton from './FavoriteButton';
import ScoreAverage from './ScoreAverage';

const MediaCard = ({ mediaDetails, mediaList, setMediaList }) => {
  let scoreAverage =
    mediaDetails.vote_average > 0
      ? Math.round(mediaDetails.vote_average)
      : null;

  const userDetails = useContext(AuthContext);

  return (
    <Wrapper>
      {mediaDetails.poster_path ? (
        <Poster
          src={`http://image.tmdb.org/t/p/w342${mediaDetails.poster_path}`}
          alt={`${mediaDetails.original_title || mediaDetails.name} poster`}
        />
      ) : (
        <Poster
          src={noPosterAvailable}
          alt={`${
            mediaDetails.original_title || mediaDetails.name
          } poster not available`}
        />
      )}
      <FavButtonWrapper>
        {userDetails.user ? (
          <FavoriteButton
            mediaId={mediaDetails.id}
            type={mediaDetails.media_type}
            mediaList={mediaList}
            setMediaList={setMediaList}
          />
        ) : null}
      </FavButtonWrapper>

      <ShadowOverlayWrapper>
        <MovieTitleWrapper>
          <MovieTitle>
            {mediaDetails.original_title || mediaDetails.name}
          </MovieTitle>
          {scoreAverage ? <ScoreAverage score={scoreAverage} /> : null}
        </MovieTitleWrapper>
      </ShadowOverlayWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const Poster = styled.img`
  width: 214px;
  border-radius: 15px;
`;

const ShadowOverlayWrapper = styled.div`
  position: relative;
  height: 101px;
  width: 214px;
  overflow: hidden;
  border-radius: 0px 0px 15px 15px;
  margin-top: -101px;
  background: linear-gradient(
    180deg,
    rgba(33, 6, 61, 0) 0%,
    rgba(33, 6, 61, 0.76) 38.02%
  );
`;

const MovieTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: top;
  padding: 30px 10px;
`;

const MovieTitle = styled.p`
  font-weight: bold;
  color: #e3e3e3;
  opacity: 100%;
`;

const FavButtonWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

export default MediaCard;
