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

  let scoreAverage =
    mediaDetails.vote_average > 0
      ? Math.round(mediaDetails.vote_average)
      : null;

  useEffect(() => {
    axios
      .get(`/api/media/single/${id}?type=${searchParams.get('type')}`)
      .then((res) => res.data)
      .then((media) => {
        console.log(media);
        setMediaDetails(media);
      });
  }, [id, searchParams]);

  return (
    <Wrapper>
      <BackdropImageWrapper>
        <BackdropImage
          src={`http://image.tmdb.org/t/p/w1280${mediaDetails.backdrop_path}`}
          alt={`${mediaDetails.original_title || mediaDetails.name} backdrop`}
        />
      </BackdropImageWrapper>

      <FavoriteButtonWrapper>
        <FavoriteButton
          mediaId={mediaDetails.id}
          type={mediaDetails.type}
          size={2}
        />
      </FavoriteButtonWrapper>

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

      <p>{mediaDetails.overview}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const BackdropImageWrapper = styled.div`
  max-width: 1080px;
  height: 325px;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-radius: 20px;
`;

const BackdropImage = styled.img`
  position: relative;
  z-index: 0;
  width: 100%;
`;

const FavoriteButtonWrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 20px;
  right: 120px;
`;

const PosterImage = styled.img`
  width: 235px;
  border-radius: 15px;
`;

const DetailsWrapper = styled.div`
  position: absolute;
  top: 200px;
  display: flex;
  width: 100%;
  max-width: 1080px;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
`;

const MediaTitle = styled.h3`
  margin-right: auto;
`;

export default MediaDetails;
