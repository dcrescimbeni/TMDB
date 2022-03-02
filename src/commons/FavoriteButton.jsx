import { useContext } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

import { AuthContext } from '../AuthContext';

const FavoriteButton = ({ mediaId, type, mediaList, setMediaList }) => {
  // console.log('fav button: ', mediaList);
  const userDetails = useContext(AuthContext);
  const { username } = useParams();

  const handleAddFavorite = (e) => {
    e.preventDefault();

    axios
      .post(`/api/users/user/${userDetails.user}/fav`, {
        mediaId,
        type,
      })
      .then((res) => console.log(res));
  };

  const handleDeleteFavorite = (e) => {
    e.preventDefault();

    axios
      .delete(
        `/api/users/user/${userDetails.user}/fav?mediaId=${mediaId}&type=${type}`
      )
      .then((res) => {
        const newList = mediaList.filter((item) => {
          return item.id !== mediaId && item.media_type;
        });
        setMediaList(newList);
      });
  };

  const isOwnProfile = userDetails.user === username ? true : false;

  if (isOwnProfile)
    return <button onClick={handleDeleteFavorite}>Delete</button>;
  else return <button onClick={handleAddFavorite}>Fav</button>;
};

export default FavoriteButton;
