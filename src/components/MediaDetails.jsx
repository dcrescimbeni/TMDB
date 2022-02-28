import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const MediaDetails = () => {
  const [mediaDetails, setMediaDetails] = useState({});
  const { id } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios
      .get(`/api/media/single/${id}?type=${searchParams.get('type')}`)
      .then((res) => res.data)
      .then((media) => {
        console.log(media);
        setMediaDetails(media);
      });
  }, [id, searchParams]);

  return <div>{mediaDetails.original_title}</div>;
};

export default MediaDetails;
