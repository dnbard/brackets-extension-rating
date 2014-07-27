'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    crypto = require('crypto'),
    counter = require('../services/counter'),
    applications = require('../services/applications');

function tick(req, res){
    var app = req.params.app,
        user = crypto.createHash('md5').update(req.ip).digest('hex');

    counter.count(app, user)
        .then(function(result){
            res.status(200).send('OK - ' + JSON.stringify(result, null, 4));
        }, function(){
            res.status(400).send();
        });
}

function recalculateApps(req, res){
    applications.init(false);
    res.status(200).send();
}

exports.tick = tick;
exports.recalculateApps = recalculateApps;
