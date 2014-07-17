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
    var id = req.params['id'],
        registry = CacheService.get('registry'),
        extension = null;

    if (typeof id !== 'string'){
        res.status(422).send();
        return;
    }

    if (!registry){
        res.status(500).send('Registry is not available');
        return;
    }

    extension = _.filter(registry, function(el){
        return el._id === id;
    });

    if (extension){
        res.status(200).send(extension);
    } else {
        res.status(404).send(id + ' not found');
    }
}
