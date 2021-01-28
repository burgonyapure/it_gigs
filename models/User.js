const Sequlize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    name:{
        type: Sequlize.STRING,
    },
    email:{
        type: Sequlize.STRING
    },
    password:{
        type: Sequlize.STRING
    }
})

module.exports = User;