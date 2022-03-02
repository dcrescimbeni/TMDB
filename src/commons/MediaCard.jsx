import axios from 'axios';
import { useContext } from 'react';
import styled from 'styled-components/macro';

import noPosterAvailable from '../assets/noPosterAvailable.jpg';
import { AuthContext } from '../AuthContext';

const MediaCard = ({ mediaDetails }) => {
  let scoreAverage =
    mediaDetails.vote_average > 0
      ? Math.round(mediaDetails.vote_average)
      : null;

  const userDetails = useContext(AuthContext);

  const handleAddFavorite = (e) => {
    e.preventDefault();
    axios
      .post(`/api/users/user/${userDetails.user}/fav`, {
        mediaId: mediaDetails.id,
        type: mediaDetails.media_type,
      })
      .then((res) => console.log(res));
    console.log('FAV!');
  };

  return (
    <Wrapper>
      {mediaDetails.poster_path ? (
        <Card
          src={`http://image.tmdb.org/t/p/w342${mediaDetails.poster_path}`}
          alt={`${mediaDetails.original_title || mediaDetails.name} poster`}
        />
      ) : (
        <Card
          src={noPosterAvailable}
          alt={`${
            mediaDetails.original_title || mediaDetails.name
          } poster not available`}
        />
      )}

      <ShadowOverlayWrapper>
        {userDetails.user ? (
          <button onClick={handleAddFavorite}>Fav</button>
        ) : null}
        <MovieTitleWrapper>
          <MovieTitle>
            {mediaDetails.original_title || mediaDetails.name}
          </MovieTitle>
          {scoreAverage ? (
            <ScoreWrapper>
              <Score>{scoreAverage}</Score>
            </ScoreWrapper>
          ) : null}
        </MovieTitleWrapper>
      </ShadowOverlayWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 57px;
`;

const Card = styled.img`
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

const ScoreWrapper = styled.div`
  min-width: 37px;
  height: 37px;
  border-radius: 50%;
  background-color: #581b98;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

const Score = styled.p`
  color: #e3e3e3;
  font-weight: bold;
`;

export default MediaCard;
