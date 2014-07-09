'use strict';

var mongoose = require('mongoose'),
    Extension = mongoose.model('Extension'),
    _ = require('lodash'),
    async = require('async'),
    bus = require('../services/bus');

var registryCache = null;

bus.on(bus.list.REGISTRY.UPDATED, function(result){
    Extension.find({})
        .exec()
        .then(function(ratings){
            registryCache = ratings;
        }, function(err){
            console.log(err);
        });
});

exports.getAllRatings = function(req, res){
    if (registryCache){
        res.status(200).send(registryCache);
    } else {
        res.status(500).send('Cache is not available');
    }
}

exports.getRating = function(req, res){
    var id = req.params['id'];

    Extension.findOne({_id: id}, function(err, extension){
        if (err){
            res.status(500).send(err);
        } else if (!extension){
            res.status(404).send(extension);
        } else {
            res.status(200).send(extension);
        }
    })
}

/*exports.setRatings = function(req, res){
    var payload = req.body;
    
    if (!_.isArray(payload)){
        res.status(500).send('Invalid Argument');
    }
    
    var asyncTasks = [];
    
    _.each(payload, function(ext){
        asyncTasks.push(function(callback){
            Extension.create(extension, callback);
        });
    });
    
    async.parallel(asyncTasks, function(){
        res.status(200).send();
    });
}*/
