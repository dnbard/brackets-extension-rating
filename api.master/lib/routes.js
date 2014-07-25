'use strict';

var api = require('./controllers/api'),
    index = require('./controllers/index');

module.exports = function(app) {
    app.route('/ratings')
        .get(api.getAllRatings);

    app.route('/rating/:id')
        .get(api.getRating);

    app.route('/')
        .get(index.default);
};
