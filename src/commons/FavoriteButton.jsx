import { useContext } from 'react';
import styled from 'styled-components/macro';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';

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
    return (
      <Button onClick={handleDeleteFavorite}>
        <AiFillHeart color={'#9C1DE7'} size={'2rem'} />
      </Button>
    );
  else
    return (
      <Button onClick={handleAddFavorite}>
        <AiFillHeart color={'#9C1DE7'} size={'2rem'} />
      </Button>
    );
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
