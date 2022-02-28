import styled from 'styled-components/macro';
import MediaGrid from './MediaGrid';

const Content = ({ searchResults }) => {
  return (
    <ContentWrapper>
      <MediaGrid searchResults={searchResults} />
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  max-width: 1440px;
`;

export default Content;
