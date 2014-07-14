'use strict';

var mongoose = require('mongoose'),
    Extension = mongoose.model('Extension'),
    _ = require('lodash'),
    async = require('async'),
    CacheService = require('../services/cache');

exports.getAllRatings = function(req, res){
    var registry = CacheService.get('registry');

    if (registry){
        res.status(200).send(registry);
    } else {
        res.status(500).send('Registry is not available');
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
