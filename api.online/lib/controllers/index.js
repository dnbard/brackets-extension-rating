var jade = require('jade');

exports.default = function(req, res) {
    var response = jade.renderFile('lib/views/index.jade', { });

    return res.status(200).send(response);
};
