import styled from 'styled-components/macro';

import { numberToCurrency, minutesToHHMM } from '../utils/utils';

const MoreDetails = ({ details }) => {
  return (
    <>
      <p>Release date</p>
      <p>
        <MovieFact>
          {details.release_date || details.first_air_date || 'Not available'}
        </MovieFact>
      </p>
      <br />
      <p>Revenue</p>
      <p>
        <MovieFact>
          {numberToCurrency(details.revenue) || 'Not available'}
        </MovieFact>
      </p>
      <br />
      <p>Runtime</p>
      <p>
        <MovieFact>
          {minutesToHHMM(details.runtime) || 'Not available'}
        </MovieFact>
      </p>
      <br />
      <p>Homepage</p>
      <p>
        <MovieFact>
          {details.homepage ? (
            <a href={details.homepage}>{details.homepage}</a>
          ) : (
            'Not available'
          )}
        </MovieFact>
      </p>
    </>
  );
};

const MovieFact = styled.span`
  font-weight: bold;
  color: #581b98;
`;

export default MoreDetails;
