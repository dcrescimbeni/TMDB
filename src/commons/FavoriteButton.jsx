import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import axios from 'axios';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';

import { AuthContext } from '../AuthContext';

const FavoriteButton = ({ mediaId, type, size, mediaList, setMediaList }) => {
  const userDetails = useContext(AuthContext);
  const [isFavorited, setIsFavorited] = useState(false);

  let { user } = userDetails;

  if (!size) size = 1;

  useEffect(() => {
    if (user) {
      axios
        .get(
          `/api/users/user/${user}/fav/check?mediaId=${mediaId}&type=${type}`
        )
        .then((res) => res.data)
        .then((isInFavorites) => {
          if (isInFavorites) setIsFavorited(true);
        });
    }
  }, [mediaId, type, user]);

  const handleAddFavorite = (e) => {
    e.preventDefault();

    axios
      .post(`/api/users/user/${user}/fav`, {
        mediaId,
        type,
      })
      .then((res) => setIsFavorited(true));
  };

  const handleDeleteFavorite = (e) => {
    e.preventDefault();

    axios
      .delete(`/api/users/user/${user}/fav?mediaId=${mediaId}&type=${type}`)
      .then((res) => {
        if (mediaList) {
          const newList = mediaList.filter((item) => {
            return item.id !== mediaId && item.media_type;
          });
          setMediaList(newList);
        }
        setIsFavorited(false);
      });
  };

  if (!user) {
    return null;
  }

  if (isFavorited) {
    return (
      <Button onClick={handleDeleteFavorite}>
        <AiFillHeart color={'#9C1DE7'} size={`${size * 2}rem`} />
      </Button>
    );
  } else {
    return (
      <Button onClick={handleAddFavorite}>
        <AiOutlineHeart color={'#9C1DE7'} size={`${size * 2}rem`} />
      </Button>
    );
  }
};

const Button = styled.button`
  padding: 0px;
  margin: 0px;
  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export default FavoriteButton;
