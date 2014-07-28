var bus = require('./bus'),
    _ = require('lodash'),
    mongoose = require('mongoose'),
    Service = mongoose.model('Service');

/*
 * [{"maxUsers":0,"name":"lalala"},{"maxUsers":1,"name":"dnbard.extensions-rating","online":0}]
 * */

bus.on(bus.list.REGISTRY.CACHED, function(registry){
    Service.find({type: 'tracking'}).lean().exec().then(function(services){
        _.each(services, function(service){

        });
    });
});
