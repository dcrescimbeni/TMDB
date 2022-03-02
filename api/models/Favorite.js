const { DataTypes, Model } = require('sequelize');
const db = require('./_db');

class Favorite extends Model {}

Favorite.init(
  {
    mediaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        customValidator(value) {
          return Favorite.findOne({
            where: {
              mediaId: this.mediaId,
              type: this.type,
              userId: this.userId,
            },
          }).then((foundFavorite) => {
            if (foundFavorite) throw new Error('Duplicated favorite');
          });
        },
      },
    },
    type: {
      type: DataTypes.ENUM('movie', 'tv'),
      allowNull: false,
    },
  },
  { sequelize: db, modelName: 'favorites' }
);

module.exports = Favorite;
