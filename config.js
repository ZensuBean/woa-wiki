var configuration = {};

configuration.app = {};
configuration.app.name = 'WoA-Wiki'

// Database
configuration.db = {};
configuration.db.adapter = 'mongodb';
configuration.db.host = 'localhost';
configuration.db.port = '27017';
configuration.db.name = 'wiki';

module.exports = configuration;