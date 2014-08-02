'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    crypto = require('crypto'),
    counter = require('../services/counter'),
    applications = require('../services/applications');

function tick(req, res){
    //WARNING: this code should be used on Heroku alike hosting providers
    //if you use own hosting then it is very likely that you need to
    //rewrite the mechanic of ip acquirement
    var ipAddr = req.headers["x-forwarded-for"],
        app = req.params.app,
        userId = req.params.user,
        user, list;

    if (userId){
        //TODO: check is that user in database, maybe cache that values on init
        user = userId;
    } else {
        if (ipAddr){
            list = ipAddr.split(",");
            ipAddr = list[list.length-1];
        } else {
            ipAddr = req.ip;
        }

        user = crypto.createHash('md5').update(ipAddr).digest('hex');
    }

    counter.count(app, user)
        .then(function(result){
            res.status(200).send(user);
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
