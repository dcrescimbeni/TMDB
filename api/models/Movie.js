const { DataTypes, Model } = require('sequelize');
const db = require('./_db');

class Movie extends Model {}

Movie.init(
  {
    movieId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    movieType: {
      type: DataTypes.ENUM('movie', 'tv'),
      allowNull: false,
    },
  },
  { sequelize: db, modelName: 'movies' }
);

module.exports = Movie;
