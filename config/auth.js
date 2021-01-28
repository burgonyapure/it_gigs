module.exports = {
    ensureAuthenticated: function(req,res,next) {
        if (req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg','You have to be logged in to view this resource!');
        res.redirect('/users/login');
    }
}