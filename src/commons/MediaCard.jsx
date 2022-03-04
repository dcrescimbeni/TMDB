import styled from 'styled-components/macro';

import noPosterAvailable from '../assets/noPosterAvailable.jpg';
import FavoriteButton from './FavoriteButton';
import ScoreAverage from './ScoreAverage';

const MediaCard = ({ mediaDetails, mediaList, setMediaList }) => {
  let scoreAverage =
    mediaDetails.vote_average > 0
      ? Math.round(mediaDetails.vote_average)
      : null;

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
        <FavoriteButton
          mediaId={mediaDetails.id}
          type={mediaDetails.media_type}
          mediaList={mediaList}
          setMediaList={setMediaList}
        />
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
  margin: 10px;
  display: flex;
  border-radius: 10px;
  background-color: #e3e3e3;

  @media (min-width: 525px) {
    display: block;
  }
`;

const Poster = styled.img`
  width: 92px;
  border-radius: 10px 0px 0px 10px;

  @media (min-width: 525px) {
    width: 214px;
    border-radius: 15px;
  }
`;

const ShadowOverlayWrapper = styled.div`
  overflow: hidden;

  @media (min-width: 525px) {
    position: relative;
    height: 101px;
    width: 214px;
    border-radius: 0px 0px 15px 15px;
    margin-top: -101px;
    background: linear-gradient(
      180deg,
      rgba(33, 6, 61, 0) 0%,
      rgba(33, 6, 61, 0.76) 38.02%
    );
  }
`;

const MovieTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* padding: 24px 14px; */
  padding-top: 24px;
  padding-left: 15px;
  padding-right: 35px;
  font-size: 1.5rem;

  @media (min-width: 525px) {
    justify-content: space-between;
    align-items: top;
    padding: 30px 15px;
    flex-direction: row;
  }
`;

const MovieTitle = styled.p`
  font-weight: bold;
  opacity: 100%;
  color: #581b98;
  margin-left: 10px;

  @media (min-width: 525px) {
    color: #e3e3e3;
    margin: 0px;
  }
`;

const FavButtonWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

export default MediaCard;
