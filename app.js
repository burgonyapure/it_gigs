//env for connection
require('dotenv').config();

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/database');
const PORT = process.env.PORT || 8000;
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//static folder for css imgs etc..
app.use(express.static(__dirname + '/public'));

//passport conf
require('./config/passport')(passport);

//connect flash
app.use(flash());

//Db connection
try {
    db.authenticate();
    console.log('Connection has been established successfully.');    
} 
catch (error) {
    console.error('Unable to connect to the database:', error);
}

//4 ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

//bodyparse
app.use(express.urlencoded({ extended: false }));

//express session
app.use(session({
    secret: 'secretysecret',
    resave: true,
    saveUninitialized: true
}));

//passport init 
app.use(passport.initialize());
app.use(passport.session());

//4 flash (global) requires session before 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.isAuthenticated();
    next();
})

//routes
app.use('/',require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/gigs', require('./routes/gigs'));

app.listen(PORT, console.log(`started at ${PORT}`));