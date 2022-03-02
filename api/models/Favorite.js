const { DataTypes, Model } = require('sequelize');
const db = require('./_db');

class Favorite extends Model {}

Favorite.init(
  {
    mediaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('movie', 'tv'),
      allowNull: false,
    },
  },
  { sequelize: db, modelName: 'favorites' }
);

Favorite.afterValidate((favorite) => {
  const { mediaId, type } = favorite;
  return Favorite.findOne({ where: { mediaId, type } }).then(
    (foundFavorite) => {
      if (foundFavorite) throw new Error('Duplicated favorite');
    }
  );
});

module.exports = Favorite;
