var express = require('express');
var router = express.Router();
var config = require('../config');

router.get('/', function(req, res) {
    res.render('general/index', {
        title: config.app.name,
        cookies: req.cookies
    });
});

router.get('/search', function(req, res) {
    res.render('general/search', {
        title: config.app.name,
        cookies: req.cookies,
        search: req.query.search
    });
});

module.exports = router;
