import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import MediaGrid from './MediaGrid';

const FavoritesList = () => {
  const { username } = useParams();
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/users/user/${username}/fav`)
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
      User favorites {username}
      <MediaGrid mediaList={userFavorites} setMediaList={setUserFavorites} />
    </div>
  );
};

export default FavoritesList;
