var bus = require('./bus'),
    _ = require('lodash'),
    request = require('request'),
    mongoose = require('mongoose'),
    Service = mongoose.model('Service'),
    CacheService = require('../services/cache');

function init(){
    bus.on(bus.list.REGISTRY.CACHED, function(){
        var registry = CacheService.get('registry');

        Service.find({type: 'tracking'}).lean().exec().then(function(services){
            _.each(services, function(service){
                trackingServiceHandler(service, registry)
            });
        });
    });
}

function trackingServiceHandler(service, registry){
    request(service.url + 'stats', function(error, response, body){
        if (error){
            console.error(error);
            return;
        }

        var stats = JSON.parse(body),
            statsReg = {};

        _.each(stats, function(stat){

            if (stat.online && stat.maxUsers){
                statsReg[stat.name] = stat;
            }
        });

        _.each(registry, function(extension){
            if (!statsReg[extension._id]) { return true; }

            console.log(extension._id);

            if (!extension.online) { extension.online = 0; }
            if (!extension.maxUsers) { extension.maxUsers = 0; }

            extension.online += statsReg[extension._id].online;
            extension.maxUsers += statsReg[extension._id].maxUsers;
        });
    });
}

exports.init = init;
