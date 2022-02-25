const User = require('./User');
const Favorite = require('./Favorite');

User.hasMany(Favorite, {
  foreignKey: {
    allowNull: false,
  },
});
Favorite.belongsTo(User);

module.exports = { User, Favorite };
