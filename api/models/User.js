const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('./_db');

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: 'users' }
);

User.beforeCreate((user) => {
  return bcrypt.hash(user.password, 10).then((hash) => {
    user.password = hash;
  });
});

module.exports = User;
