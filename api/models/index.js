const User = require('./User');
const Movie = require('./Movie');

User.belongsToMany(Movie, { through: 'favorites' });

module.exports = { User, Movie };
