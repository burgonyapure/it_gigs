const LocalStrategy = require('passport-local').Strategy;
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

//we need user
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //find user
            User.findOne({ email:email })
            .then(user => {
                //no user
                if (!user){
                    return done(null, false, { message: 'Invalid credentials'});
                }
                //pass check
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch){
                        return done(null,user);
                    }
                    else return done(null, false,'Invalid credentials');
                });
            })
            .catch(err => console.log(err));
        })
    );
    //serialize and deserialize (passportjs documentation kinda sucks btw...)
    
    passport.serializeUser((user,done) => {
        done(null,user.id);
    });

    passport.deserializeUser((id,done) => {
        User.findByPk(id)
        .then((user,err) => {
            //console.log("this--> ", user);
            done(err,user);
        });
    });
    //yeet...
}