const { DataTypes, Model } = require('sequelize');
const db = require('./_db');

class Favorite extends Model {}

Favorite.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: 'favorites' }
);

module.exports = Favorite;
