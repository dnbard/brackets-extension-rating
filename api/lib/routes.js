'use strict';

var api = require('./controllers/api'),
    index = require('./controllers/index');

module.exports = function(app) {
    app.route('/ratings')
        .get(api.getAllRatings)
        .post(api.setRatings);
    
    app.route('/')
        .get(index.default);
};