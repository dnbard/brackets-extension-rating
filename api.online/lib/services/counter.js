var q = require('q'),
    Applications = require('../services/applications'),

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
}

function count(app, user){
    var defer = q.defer();

    if (!app || !user || !Applications.check(app)){
        defer.reject();
    } else {
        put(app, user);
        defer.resolve(holder);
    }

    return defer.promise;
}

bus.on(bus.list.COUNTER.SAVE, function(){
    if (_.size(holder) === 0){
        bus.emit(bus.list.APPLICATION.ZERO_ONLINE);
        holder = {};
        return;
    }

    _.each(holder, function(app, id){
        var online = _.size(app),
            dailyUsers = (app.dailyUsers || '').split(','),
            dailyUsersStringified;

        if (dailyUsers.length >= 24){
            dailyUsers.slice(1);
        }

        dailyUsers.push(online);

        dailyUsersStringified = dailyUsers.join(',');

        bus.emit(bus.list.APPLICATION.SAVE,{
            id: id,
            online: online,
            users: app,
            dailyUsers: dailyUsersStringified
        });
    });

    holder = {};
});

exports.count = count;
