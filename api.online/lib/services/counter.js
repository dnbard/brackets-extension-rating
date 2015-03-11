var q = require('q'),
    ApplicationsService = require('../services/applications'),
    mongoose = require('mongoose'),
    Applications = mongoose.model('Application'),
    Counter = mongoose.model('Counters'),
    bus = require('./bus'),
    _ = require('lodash'),
    holder = {};

function put(app, user){
    if (!holder[app]){
        holder[app] = {}
    }

    if (!holder[app][user]){
        holder[app][user] = 1
    } else {
        holder[app][user] ++;
    }

    Counter.findOne({
        application: app,
        user: user
    }).exec().then(function(counter){
        if (counter){
            counter.update = new Date();
        } else {
            counter = new Counter({
                application: app,
                user: user
            });
        }

        counter.save();
    });
}

function count(app, user){
    var defer = q.defer();

    if (!app || !user || !ApplicationsService.check(app)){
        defer.reject();
    } else {
        put(app, user);
        defer.resolve(holder);
    }

    return defer.promise;
}

bus.on(bus.list.COUNTER.SAVE_OFTEN, function(){
    ApplicationsService.get().then(function(apps){
        _.each(apps, function(app){
            Counter.count({
                application: app._id
            }).exec().then(function(online){
                app.online = online;
                app.save();
            });
        });
    });
});

bus.on(bus.list.COUNTER.SAVE, function(){
    ApplicationsService.get().then(function(apps){
        _.each(apps, function(app){
            Counter.count({
                application: app._id
            }).exec().then(function(online){
                app.online = online;
                app.save();

                bus.emit(bus.list.APPLICATION.SAVE,{
                    id: app._id,
                    online: online,
                    users: holder[app._id]
                });
            });
        });

        holder = {};
    });
});

exports.count = count;
