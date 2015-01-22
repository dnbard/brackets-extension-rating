var mongoose = require('mongoose'),
    Application = mongoose.model('Application'),
    Users = mongoose.model('user2app'),
    _ = require('lodash'),
    bus = require('./bus'),
    keys = {},
    MS_PER_MINUTE = 60000;

function init(initEvents){
    initEvents = initEvents === undefined? true : initEvents;

    Application.find({})
        .lean()
        .exec()
        .then(function(applications){
            keys = {};

            _.each(applications, function(app){
                keys[app._id] = app.name;
            });
        });

    if (!initEvents) { return; }

    var updateWorks = 0;

    bus.on(bus.list.APPLICATION.SAVE, function(app){
        updateWorks ++;
        Application.findOneAndUpdate({ _id: app.id }, {
            online: app.online,
            update: Date.now(),
            dailyUsers: app.dailyUsers
        }).exec().then(function(){
            updateWorks --;
            if (updateWorks === 0){ bus.emit(bus.list.APPLICATION.ZERO_ONLINE); }
        });

        Users.find({app: app.id}).lean().exec().then(function(users){
            var userIds = {};
            _.each(users, function(ent){
                userIds[ent.user] = true;
            });

            _.each(app.users, function(hits, userId){
                if (!userIds[userId]){
                    var userLink = new Users({
                        app: app.id,
                        user: userId
                    });
                    userLink.save();
                }
            });
        });
    });

    bus.on(bus.list.APPLICATION.ZERO_ONLINE, function(){
        var now = new Date();
        Application.find({
            update: {
                $lt: new Date(now - 1 * MS_PER_MINUTE)
            }
        }).exec().then(function(apps){
            _.each(apps, function(app){
                app.online = 0;
                app.save();
            });
        });
    });

    bus.on(bus.list.APPLICATION.MAX_USERS, function(){
        _.each(keys, function(app, key){
            Users.count({app: key}).exec().then(function(count){
                console.log(key + '(' + app + ') - ' + count + ' user(s)');
                Application.findOneAndUpdate({ _id: key }, { maxUsers: count }).exec();
            });
        });
    });
}

function check(application){
    return keys[application] !== undefined;
}

function get(){
    return Application.find({})
        .select({name: 1, maxUsers: 1, online: 1, _id: 0})
        .lean()
        .exec();
}

init();
exports.init = init;
exports.check = check;
exports.get = get;
