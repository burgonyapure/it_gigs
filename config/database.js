const Sequelize = require('sequelize');

module.exports = sequelize = new Sequelize('nodejs_gigs', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});