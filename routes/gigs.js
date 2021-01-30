const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req,res) => 
    Gig.findAll()
    .then(gigs => res.render('gigs', {
        gigs
    }))
    .catch(err => res.render('error', {error: err}))
);

router.get('/add', (req, res) => res.render('add'));

//add new gig
router.post('/add', (req,res) => {
    let { title, technologies, budget, description, contact_email } = req.body;
    let errors = [];

    if(!title){
        errors.push({message:'Title field is required!'})
    }
    if(!technologies){
        errors.push({message:'Technologies field is required!'})
    }
    if(!description){
        errors.push({message:'Description field is required!'})
    }
    if(!contact_email){
        errors.push({message:'Contact E-mail field is required!'})
    }
    //render with errors
    if (errors.length > 0){
        res.render('add', {
            errors,
            title, 
            technologies, 
            budget, 
            description, 
            contact_email
        });
    }
    //Add 
    else {
        if (!budget) {
            budget = 'Unknown';
        } else {
            budget = `$${budget}`;
        }
        //format tech
        technologies = technologies.toLowerCase().replace(/,[ ]+/g, ',');
        //insert into db
        Gig.create({ //es6 also
            title,
            technologies,
            description,
            budget,
            contact_email
        })
        .then(gig => res.redirect('/gigs'))
        .catch(err => console.log(err));
    }
})

//the search
router.get('/search', (req, res) => {
    let { term } = req.query;
    
    //lowercase
    term = term.toLowerCase();
  
    Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
      .then(gigs => res.render('gigs', { gigs }))
      .catch(err => res.render('error', {error: err}));
  });

module.exports = router;