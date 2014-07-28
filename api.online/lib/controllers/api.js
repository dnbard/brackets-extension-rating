'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    crypto = require('crypto'),
    counter = require('../services/counter'),
    applications = require('../services/applications');

function tick(req, res){
    var ipAddr = req.headers["x-forwarded-for"],
        app = req.params.app,
        user, list;

    if (ipAddr){
        list = ipAddr.split(",");
        ipAddr = list[list.length-1];
    } else {
        ipAddr = req.ip;
    }

    user = crypto.createHash('md5').update(ipAddr).digest('hex');

    counter.count(app, user)
        .then(function(result){
            res.status(200).send('OK');
        }, function(){
            res.status(400).send('ERROR');
        });
}

function recalculateApps(req, res){
    applications.init(false);
    res.status(200).send();
}

function stats(req, res){
    applications.get().then(function(apps){
        res.status(200).send(apps);
    }, function(err){
        res.status(500).send('ERROR');
    });
}

exports.tick = tick;
exports.recalculateApps = recalculateApps;
exports.stats = stats;
