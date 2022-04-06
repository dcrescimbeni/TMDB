import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components/macro';
import { useContext } from 'react';

import MediaGrid from './MediaGrid';
import { AuthContext } from '../AuthContext';

const FavoritesList = ({ currentSearch }) => {
  const { username } = useParams();
  const [userFavorites, setUserFavorites] = useState([]);
  const userDetails = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/users/user/${username}/fav`)
      .then((res) => res.data)
      .then((favorites) => {
        const mediaDetails = favorites.map((item) => {
          return item.tmdbDetails;
        });
        setUserFavorites(mediaDetails);
      });
  }, [username]);

  return (
    <div>
      <h3>
        <AccentSpan>
          {userDetails.user === username ? 'Your' : `${username}'s`}
        </AccentSpan>{' '}
        favorites
      </h3>
      <MediaGrid mediaList={userFavorites} setMediaList={setUserFavorites} />
    </div>
  );
};

const AccentSpan = styled.span`
  color: #9c1de7;
`;

export default FavoritesList;
