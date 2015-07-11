var ScheduleWorker = require('./worker'),
    registry = require('./registry'),
    migrations = require('./migrations'),
    stats = require('./stats');


exports.init = function(){
    migrations.do().then(function(){
        var registryWorker = new ScheduleWorker({ minute: 1 }, registry.handler, true),
            dbFilterWorker = new ScheduleWorker({ hour: 1 }, registry.dbFilter),
            saveRequestStats = new ScheduleWorker({ minute: 0 }, function(){ stats.save('ratings'); });
    });
}
