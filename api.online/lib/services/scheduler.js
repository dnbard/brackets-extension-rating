var schedule = require('node-schedule'),
    ScheduleWorker = require('./worker'),
    request = require('request'),
    migrations = require('./migrations');

//var host = process.env.NODE_ENV === 'development'? 'http://localhost:9000/':'http://brackets-rating.herokuapp.com/';

function pingPongHerokuHandler(){
    request(host, function(err, res, body){ });
}

exports.init = function(){
    migrations.do().then(function(){
//        var firstHerokuWorker = new ScheduleWorker({ minute: 15 }, pingPongHerokuHandler),
//            secondHerokuWorker = new ScheduleWorker({ minute: 45 }, pingPongHerokuHandler);
    });
}
