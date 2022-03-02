import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import MediaGrid from './MediaGrid';

const Content = () => {
  const [searchResults, setSearchResults] = useState([]);

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios
      .get(`/api/media/search?query=${searchParams.get('query')}`)
      .then((res) => res.data)
      .then((results) => {
        console.log(results);
        setSearchResults(results);
      });
  }, [searchParams]);

  return (
    <ContentWrapper>
      <MediaGrid mediaList={searchResults} />
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  max-width: 1440px;
`;

export default Content;
