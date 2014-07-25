var stats = require('../services/stats'),
    jade = require('jade');

exports.default = function(req, res) {
    var response = jade.renderFile('lib/views/index.jade', {
        ratings: stats.get('ratings')
    });

    return res.status(200).send(response);
};
