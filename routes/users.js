const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');

//login
router.get('/login', (req, res) => res.render("login"));

//register
router.get('/register', (req, res) => res.render("register"));

//reg handler
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;

    let errors = [];

    //required fields
    if (!name || !email || !password || !password2){
        errors.push({message: 'Fill required'});
    }
    //pwd matches or not
    if (password !== password2) {
        errors.push({message:"Passwords do not match"});
    }
    //pass length
    if (password.length < 6){
        errors.push({message:"At least 6 chars required for a password"});
    }
    //if errors -> no go, else gogo
    if (errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }
    //valid stuff, go on
    else {
        User.findOne( {email: email} ).then(user => {
            if (user){ //user exists
                errors.push({message:'User already exists'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }
            else {
                const newUser = new User({ //es6 miatt nemkell name:name
                    name,
                    email,
                    password
                });

                //hash mah boi salt+hash
                bcrypt.genSalt(10, (err,salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        //pass = hashed pass
                        newUser.password = hash;
                        // save user in db
                        newUser.save()
                        .then(user => {
                            req.flash('success_msg','Registration Successful!');
                            res.redirect('/users/login');
                        }).catch()
                }))
            }
        });
    }
});

//handle loögin
router.post('/login',(req,res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
})
//handle logout
router.get('/logout', (req,res) => {
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/users/login');
})


module.exports = router;