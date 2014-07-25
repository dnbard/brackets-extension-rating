'use strict';

var api = require('./controllers/api'),
    index = require('./controllers/index');

module.exports = function(app) {
    app.route('/')
        .get(index.default);
};
