var q = require('q'),
    Applications = require('../services/applications'),
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

exports.count = count;
