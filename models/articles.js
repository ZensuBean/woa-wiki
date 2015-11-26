var mongoose = require('mongoose');

var Article= mongoose.model('Article', {
    title: String,
    content: String,
    published: Boolean
});

module.exports = Article;