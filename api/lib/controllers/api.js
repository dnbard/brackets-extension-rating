'use strict';

var mongoose = require('mongoose'),
    Rating = mongoose.model('Rating'),
    _ = require('lodash'),
    async = require('async');

exports.getAllRatings = function(req, res){
    Rating.find({})
        .exec()
        .then(function(ratings){
            res.send(ratings);
        }, function(err){
            res.status(500).send(err);
        });
}

exports.setRatings = function(req, res){
    var payload = req.body;
    
    if (!_.isArray(payload)){
        res.status(500).send('Invalid Argument');
    }
    
    var asyncTasks = [];
    
    _.each(payload, function(ext){
        asyncTasks.push(function(callback){
            Rating.fromExtension(extension, callback);
        });
    });
    
    async.parallel(asyncTasks, function(){
        res.status(200).send();
    });
}