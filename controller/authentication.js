var express = require('express');
var bcrypt = require('bcrypt');
var config = require('../config');
var User = require('../models/users');

var router = express.Router();

router.post('/check', function(req, res) {
    // Check if already authenticated and redirect to the last visited site
    if (req.cookies.user) res.redirect('back');

    var username = req.body.username;
    var password = req.body.password;
    var user;

    // Currently only for debugging purposes:
    // create a root user if it doesn't exist
    if(username === 'root') {
        User.find({ username: username}, function(error, users) {
            if(error)
                console.log(error);

            if (users[0] == undefined) {
                bcrypt.hash('admin', 8, function(err, hash) {
                    user = new User({username: username, password: hash});
                    user.save();
                    console.log('Root created!');
                });
            } else {
                bcrypt.compare(password, users[0].password, function(err, result) {
                    if(result) {
                        user = users[0];
                        res.cookie('user', user._id, {
                            //expires: new Date(Date.now() + 900000),
                            httpOnly: false
                        });
                        console.log('root found!');
                        console.log(user)
                        res.redirect('/');
                    } else {
                        res.render('authentication/sign_in', {
                            title: config.app.name,
                            cookies: req.cookies,
                            search: req.query.search
                        });
                    }
                });
            }
        });
    } else {
        // ToDo: Implement the general user authentication handling

    }
});

router.get('/sign_out', function(req, res) {
    // Check if user id is set and clear it
    if (req.cookies.user) res.clearCookie('user');
    res.redirect('/');
});

module.exports = router;
