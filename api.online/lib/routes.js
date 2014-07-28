'use strict';

var api = require('./controllers/api'),
    index = require('./controllers/index');

module.exports = function(app) {
    app.route('/ping')
        .get(function(req, res){
            res.send('Pong');
        });

    app.route('/tick/:app')
        .get(api.tick);

    app.route('/apps')
        .get(api.recalculateApps);

    app.route('/')
        .get(index.default);

    app.route('/stats')
        .get(api.stats);
};
