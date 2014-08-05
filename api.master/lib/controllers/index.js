var stats = require('../services/stats'),
    jade = require('jade'),
    mongoose = require('mongoose'),
    Counter = mongoose.model('Counter');

exports.default = function(req, res) {
    Counter.find({})
        .select({ count: 1, timestamp: 1, _id: 0 })
        .sort({timestamp: -1})
        .limit(48)
        .lean()
        .exec()
        .then(function(data){
            var response = jade.renderFile('lib/views/index.jade', {
                ratings: stats.get('ratings'),
                data: data
            });
            return res.status(200).send(response);
        }, function(err){
            res.status(500).send(err);
        });
};
