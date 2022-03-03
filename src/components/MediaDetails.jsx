import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components/macro';

import ScoreAverage from '../commons/ScoreAverage';
import FavoriteButton from '../commons/FavoriteButton';

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
        <BackdropImage
          src={`http://image.tmdb.org/t/p/w1280${mediaDetails.backdrop_path}`}
          alt={`${mediaDetails.original_title || mediaDetails.name} backdrop`}
        />
        <Shadow></Shadow>
        <FavoriteButtonWrapper>
          <FavoriteButton mediaId={mediaDetails.id} type={mediaType} size={2} />
        </FavoriteButtonWrapper>
      </BackdropImageWrapper>

      <DetailsWrapper>
        <PosterImage
          src={`http://image.tmdb.org/t/p/w342${mediaDetails.poster_path}`}
          alt={`${mediaDetails.original_title || mediaDetails.name} poster`}
        />
        <MediaTitle>
          {mediaDetails.original_title || mediaDetails.name}
        </MediaTitle>
        {scoreAverage ? <ScoreAverage score={scoreAverage} size={2} /> : null}
      </DetailsWrapper>

      <OverviewWrapper>
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
  height: 325px;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-radius: 20px;
  position: relative;
`;

const BackdropImage = styled.img`
  position: relative;
  z-index: -2;
  width: 100%;
`;

const Shadow = styled.div`
  width: 100%;
  height: 122px;
  position: absolute;
  bottom: 0;

  z-index: -1;
  background: linear-gradient(
    180deg,
    rgba(24, 24, 24, 0) 0%,
    rgba(24, 24, 24, 0.56) 31.25%
  );
`;

const FavoriteButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const PosterImage = styled.img`
  width: 235px;
  border-radius: 15px;
  margin: 0px 40px;
  margin-top: -50px;
`;

const DetailsWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  max-width: 1080px;
  top: 210px;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
`;

const MediaTitle = styled.h3`
  margin-right: auto;
  padding-right: 30px;
  color: white;
`;

const OverviewWrapper = styled.div`
  padding-left: 334px;
  padding-right: 140px;
  padding-top: 23px;
`;

const Overview = styled.p`
  line-height: 1.85;
`;

export default MediaDetails;
