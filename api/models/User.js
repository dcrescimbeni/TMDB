const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('./_db');

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[A-Za-z0-9_]+$/g,
        len: [3, 23],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originalUsername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: 'users' }
);

User.beforeValidate((user) => {
  user.originalUsername = user.username;
});

User.beforeCreate((user) => {
  return bcrypt.hash(user.password, 10).then((hash) => {
    user.password = hash;
  });
});

User.beforeCreate((user) => {
  user.username = user.username.toLowerCase();
});

module.exports = User;
