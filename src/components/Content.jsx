import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import MediaGrid from './MediaGrid';

const Content = () => {
  const [searchResults, setSearchResults] = useState([]);
  let [searchParams] = useSearchParams();
  const currentSearch = searchParams.get('query');

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/media/search?query=${currentSearch}`
      )
      .then((res) => res.data)
      .then((results) => {
        console.log(results);
        setSearchResults(results);
      });
  }, [currentSearch]);

  return (
    <ContentWrapper>
      <Title>
        Search results for <AccentSpan>{currentSearch}</AccentSpan>
      </Title>

      <MediaGrid mediaList={searchResults} currentSearch={currentSearch} />
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  max-width: 1440px;
`;

const AccentSpan = styled.span`
  color: #9c1de7;
`;

const Title = styled.h3`
  margin-left: 10px;
`;

export default Content;
