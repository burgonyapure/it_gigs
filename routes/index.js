const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//landing page
router.get('/', (req, res) => res.render("landing"));

//proteceted dash
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render("dashboard",{
      name: req.user.name
    }));

module.exports = router; 