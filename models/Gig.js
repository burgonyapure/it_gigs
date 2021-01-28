const Sequlize = require('sequelize');
const db = require('../config/database');

const Gig = db.define('gig', {
    title:{
        type: Sequlize.STRING
    },
    technologies:{
        type: Sequlize.STRING
    },
    description:{
        type: Sequlize.STRING
    },
    budget:{
        type: Sequlize.STRING
    },
    contact_email:{
        type: Sequlize.STRING
    }
})

module.exports = Gig;