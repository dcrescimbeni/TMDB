import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components/macro';

import ScoreAverage from '../commons/ScoreAverage';

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
    <div>
      <BackdropImageWrapper>
        <BackdropImage
          src={`http://image.tmdb.org/t/p/w1280${mediaDetails.backdrop_path}`}
          alt={`${mediaDetails.original_title || mediaDetails.name} backdrop`}
        />
      </BackdropImageWrapper>
      <DetailsWrapper>
        <PosterImage
          src={`http://image.tmdb.org/t/p/w342${mediaDetails.poster_path}`}
          alt={`${mediaDetails.original_title || mediaDetails.name} poster`}
        />
        <div>
          <h3>{mediaDetails.original_title || mediaDetails.name}</h3>
          <p>{mediaDetails.overview}</p>
        </div>
        {scoreAverage ? <ScoreAverage score={scoreAverage} size={2} /> : null}
      </DetailsWrapper>
    </div>
  );
};

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

const PosterImage = styled.img`
  width: 235px;
  border-radius: 15px;
`;

const DetailsWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1080px;
  justify-content: space-between;
`;

export default MediaDetails;
