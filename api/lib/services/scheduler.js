var schedule = require('node-schedule'),
    ScheduleWorker = require('./worker'),
    request = require('request'),
    registry = require('./registry');

var host = process.env.NODE_ENV === 'development'? 'http://localhost:9000/':'http://brackets-rating.herokuapp.com/';

function pingPongHerokuHandler(){
    request(host, function(err, res, body){ });
}

exports.init = function(){
    var firstHerokuWorker = new ScheduleWorker({minute: 15}, pingPongHerokuHandler),
        secondHerokuWorker = new ScheduleWorker({minute: 45}, pingPongHerokuHandler);

    var registryWorker = new ScheduleWorker({minute: 1}, registry.handler, true);

    var dbFilterWorker = new ScheduleWorker({hour: 1}, registry.dbFilter, true);
}
