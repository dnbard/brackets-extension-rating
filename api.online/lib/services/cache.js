var cache = {},
    _ = require('lodash'),
    mongoose = require('mongoose'),
    Extension = mongoose.model('Extension'),
    Download = mongoose.model('Download'),
    Q = require('q'),
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

    if (cache[id]){
        delete cache[id];
    }

    cache[id] = value;
}

exports.keys = function(){
    return _.keys(cache);
}

bus.on(bus.list.REGISTRY.UPDATED, function(result){
    Extension.find({})
        .lean()
        .exec()
        .then(function(ratings){
            populateDownloads(ratings).then(function(){
                exports.set('registry', ratings);
                bus.emit(bus.list.REGISTRY.CACHED, ratings);
            }, function(err){
                console.log(err);
            });
        }, function(err){
            console.log(err);
        });
});

function populateDownloads(extensions){
    var defer = Q.defer(),
        extList = {};

    _.each(extensions, function(extension){
        extList[extension._id] = extension;
    });

    var stream = Download.find({})
        .sort({ timestamp: 1 })
        .lean()
        .stream();

    stream.on('data', function(d){
        var e = extList[d.extension];

        if (!e.downloads){ e.downloads = []; }

        e.downloads.push(d);
    });

    stream.on('close', function(){
        defer.resolve();
    });

    return defer.promise;
}
