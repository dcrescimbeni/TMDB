const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/tmdb', { logging: false });

module.exports = db;
