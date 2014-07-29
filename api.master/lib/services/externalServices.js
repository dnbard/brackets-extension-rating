var bus = require('./bus'),
    _ = require('lodash'),
    request = require('request'),
    mongoose = require('mongoose'),
    Service = mongoose.model('Service');

function init(){
    bus.on(bus.list.REGISTRY.CACHED, function(registry){
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
            if (stat.online && stat.MaxUsers){
                statsReg[stat.name] = stat;
            }
        });

        _.each(registry, function(extension){
            if (!statsReg[extension._id]) { return true; }
            if (!extension.online) { extension.online = 0; }
            if (!extension.maxUsers) { extension.maxUsers = 0; }

            extension.online += statsReg.online;
            extension.maxUsers += statsReg.maxUsers;
        });
    });
}

exports.init = init;
