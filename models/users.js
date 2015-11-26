var mongoose = require('mongoose');

var User= mongoose.model('User', {
    username: String,
    email: String,
    password: String,
    admin: Boolean,
    activated: Boolean
});

module.exports = User;