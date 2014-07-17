var _ = require('lodash'),
    async = require('async'),
    Q = require('q'),
    mongoose = require('mongoose'),
    Setting = mongoose.model('Setting');

var migrations = [ require('../migrations/copyDownloadsInfo') ],
    defer;

exports.do = function(){
    defer = Q.defer();

    Setting.findOne({})
        .exec()
        .then(settingsAvailableHandler);

    return defer.promise;
}

function settingsAvailableHandler(setting){
    if (!setting){
        noSettingsHandler(null);
        return;
    }

    var version = setting.version, maxVersion = -1,
        series = [];

    _.each(migrations, function(migration, migrationVersion){
        if (migrationVersion > version){
            series.push(migration);
            maxVersion = migrationVersion > maxVersion? migrationVersion : maxVersion;
        }
    });

    if (series.length > 0){
        async.series(series, function(err){
            if (err){ console.log(err); }
            else {
                setting.version = maxVersion;
                setting.save(function(){
                    defer.resolve();
                });
            }
        });
    } else {
        defer.resolve();
    }
}

function noSettingsHandler(err){
    var setting = new Setting();
    setting.save(function(err, setting){
        if (err) { defer.reject(); }
        settingsAvailableHandler(setting);
    });
}
