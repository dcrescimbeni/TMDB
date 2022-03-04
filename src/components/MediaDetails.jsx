import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components/macro';

import ScoreAverage from '../commons/ScoreAverage';
import FavoriteButton from '../commons/FavoriteButton';
import noPosterAvailable from '../assets/noPosterAvailable.jpg';
import noBackdropAvailable from '../assets/noBackdropAvailable.jpg';

const MediaDetails = () => {
  const [mediaDetails, setMediaDetails] = useState({});
  const { id } = useParams();
  let [searchParams] = useSearchParams();
  let mediaType = searchParams.get('type');

  let scoreAverage =
    mediaDetails.vote_average > 0
      ? Math.round(mediaDetails.vote_average)
      : null;

  useEffect(() => {
    axios
      .get(`/api/media/single/${id}?type=${mediaType}`)
      .then((res) => res.data)
      .then((media) => {
        console.log(media);
        setMediaDetails(media);
      });
  }, [id, mediaType]);

  return (
    <Wrapper>
      <BackdropImageWrapper>
        {mediaDetails.backdrop_path ? (
          <BackdropImage
            src={`http://image.tmdb.org/t/p/w1280${mediaDetails.backdrop_path}`}
            alt={`${mediaDetails.original_title || mediaDetails.name} backdrop`}
          />
        ) : (
          <BackdropImage
            src={noBackdropAvailable}
            alt={`${
              mediaDetails.original_title || mediaDetails.name
            } backdrop not available`}
          />
        )}

        <Shadow></Shadow>
        <FavoriteButtonWrapper>
          <FavoriteButton mediaId={mediaDetails.id} type={mediaType} size={2} />
        </FavoriteButtonWrapper>
      </BackdropImageWrapper>

      <DetailsWrapper>
        {mediaDetails.poster_path ? (
          <PosterImage
            src={`http://image.tmdb.org/t/p/w342${mediaDetails.poster_path}`}
            alt={`${mediaDetails.original_title || mediaDetails.name} poster`}
          />
        ) : (
          <PosterImage
            src={noPosterAvailable}
            alt={`${
              mediaDetails.original_title || mediaDetails.name
            } poster not available`}
          />
        )}

        <MediaTitle>
          {mediaDetails.original_title || mediaDetails.name}
        </MediaTitle>
        {scoreAverage ? <ScoreAverage score={scoreAverage} size={2} /> : null}
      </DetailsWrapper>

      <OverviewWrapper>
        <GenresWrapper>
          {mediaDetails.genres
            ? mediaDetails.genres.map((item) => (
                <GenrePill>{item.name}</GenrePill>
              ))
            : null}
        </GenresWrapper>
        <Overview>{mediaDetails.overview}</Overview>
      </OverviewWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  max-width: 1080px;
`;

const BackdropImageWrapper = styled.div`
  max-width: 1080px;
  height: 450px;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;

  @media (min-width: 800px) {
    height: 325px;
    border-radius: 20px;
  }
`;

const BackdropImage = styled.img`
  position: relative;
  z-index: -2;
  /*  */
  object-fit: cover;
  height: 99%;

  @media (min-width: 800px) {
    width: 100%;
  }
`;

const Shadow = styled.div`
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: 0;
  z-index: -1;
  background: linear-gradient(
    to top,
    hsl(0, 0%, 100%) 0%,
    hsla(0, 0%, 100%, 0.987) 8.1%,
    hsla(0, 0%, 100%, 0.951) 15.5%,
    hsla(0, 0%, 100%, 0.896) 22.5%,
    hsla(0, 0%, 100%, 0.825) 29%,
    hsla(0, 0%, 100%, 0.741) 35.3%,
    hsla(0, 0%, 100%, 0.648) 41.2%,
    hsla(0, 0%, 100%, 0.55) 47.1%,
    hsla(0, 0%, 100%, 0.45) 52.9%,
    hsla(0, 0%, 100%, 0.352) 58.8%,
    hsla(0, 0%, 100%, 0.259) 64.7%,
    hsla(0, 0%, 100%, 0.175) 71%,
    hsla(0, 0%, 100%, 0.104) 77.5%,
    hsla(0, 0%, 100%, 0.049) 84.5%,
    hsla(0, 0%, 100%, 0.013) 91.9%,
    hsla(0, 0%, 100%, 0) 100%
  );

  @media (min-width: 800px) {
    height: 122px;
    background: linear-gradient(
      to top,
      hsla(0, 0%, 0%, 0.55) 0%,
      hsla(0, 0%, 0%, 0.543) 8.1%,
      hsla(0, 0%, 0%, 0.523) 15.5%,
      hsla(0, 0%, 0%, 0.493) 22.5%,
      hsla(0, 0%, 0%, 0.454) 29%,
      hsla(0, 0%, 0%, 0.407) 35.3%,
      hsla(0, 0%, 0%, 0.356) 41.2%,
      hsla(0, 0%, 0%, 0.302) 47.1%,
      hsla(0, 0%, 0%, 0.248) 52.9%,
      hsla(0, 0%, 0%, 0.194) 58.8%,
      hsla(0, 0%, 0%, 0.143) 64.7%,
      hsla(0, 0%, 0%, 0.096) 71%,
      hsla(0, 0%, 0%, 0.057) 77.5%,
      hsla(0, 0%, 0%, 0.027) 84.5%,
      hsla(0, 0%, 0%, 0.007) 91.9%,
      hsla(0, 0%, 0%, 0) 100%
    );
  }
`;

const FavoriteButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const PosterImage = styled.img`
  display: none;

  @media (min-width: 800px) {
    display: block;
    width: 235px;
    border-radius: 15px;
    margin: 0px 40px;
  }
`;

const DetailsWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  max-width: 1080px;
  justify-content: space-between;
  /* align-items: center; */
  padding: 20px;
  top: 300px;
  /*  */
  max-height: 180px;
  overflow: hidden;

  @media (min-width: 800px) {
    align-items: center;
    max-height: 100%;
    top: 90px;
    padding: 0px;
    padding-right: 20px;
  }
`;

const MediaTitle = styled.h3`
  color: #581b98;
  overflow: hidden;

  @media (min-width: 800px) {
    margin-right: auto;
    padding-right: 30px;
    color: white;
  }
`;

const OverviewWrapper = styled.div`
  padding: 25px;
  @media (min-width: 800px) {
    padding-left: 334px;
    padding-right: 140px;
    padding-top: 23px;
  }
`;

const Overview = styled.p`
  line-height: 1.85;
`;

const GenresWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
`;

const GenrePill = styled.p`
  border-radius: 10px;
  background: #d4b4e8;
  color: #9c1de7;
  padding: 5px 15px;
`;

export default MediaDetails;
