var mongoose = require('mongoose');

var Category= mongoose.model('Category', {
    name: String,
    published: Boolean
});

module.exports = Category;