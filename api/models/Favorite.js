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

module.exports = Favorite;
