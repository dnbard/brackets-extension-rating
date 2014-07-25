var schedule = require('node-schedule'),
    ScheduleWorker = require('./worker'),
    request = require('request'),
    registry = require('./registry'),
    migrations = require('./migrations'),
    stats = require('./stats');

var host = process.env.NODE_ENV === 'development'? 'http://localhost:9000/':'http://brackets-rating.herokuapp.com/';

function pingPongHerokuHandler(){
    request(host, function(err, res, body){ });
}

exports.init = function(){
    migrations.do().then(function(){
        var firstHerokuWorker = new ScheduleWorker({ minute: 15 }, pingPongHerokuHandler),
            secondHerokuWorker = new ScheduleWorker({ minute: 45 }, pingPongHerokuHandler),
            registryWorker = new ScheduleWorker({ minute: 1 }, registry.handler, true),
            dbFilterWorker = new ScheduleWorker({ hour: 1 }, registry.dbFilter),
            saveRequestStats = new ScheduleWorker({ minute: 0 }, function(){ stats.save('ratings'); });
    });
}
