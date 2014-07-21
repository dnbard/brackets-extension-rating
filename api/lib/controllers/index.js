var stats = require('../services/stats');

exports.default = function(req, res) {
    var response = '<div>/ratings Requests last hour - ' + stats.get('ratings') + '</div>';

    return res.status(200)
        .send('<div>Brackets Rating API Server - OK</div>' + response);
};
