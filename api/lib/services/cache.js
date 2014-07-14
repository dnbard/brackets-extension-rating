var cache = {},
    _ = require('lodash'),
    mongoose = require('mongoose'),
    Extension = mongoose.model('Extension'),
    bus = require('./bus');

exports.get = function(id){
    if (typeof id !== 'string'){
        return new Error('Invalid argument');
    }

    return cache[id];
}

exports.set = function(id, value){
    if (typeof id !== 'string'){
        return new Error('Invalid argument');
    }

    cache[id] = value;
}

exports.keys = function(){
    return _.keys(cache);
}

bus.on(bus.list.REGISTRY.UPDATED, function(result){
    Extension.find({})
        .exec()
        .then(function(ratings){
            exports.set('registry', ratings);
            bus.emit(bus.list.REGISTRY.CACHED, ratings);
        }, function(err){
            console.log(err);
        });
});
