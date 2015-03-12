var ScheduleWorker = require('./worker'),
    request = require('request'),
    migrations = require('./migrations'),
    bus = require('./bus');

function pingPongHerokuHandler(){
    var host = process.env.NODE_ENV === 'development'? 'http://localhost:9000/':'http://brackets-online.herokuapp.com/';
    if (host !== undefined){
        request(host, function(err, res, body){ });
    }
}

function saveStatsHandler(){
    bus.emit(bus.list.COUNTER.SAVE);
}

function maxUsersCalculator(){
    bus.emit(bus.list.APPLICATION.MAX_USERS);
}

exports.init = function(){
    migrations.do().then(function(){
        var firstHerokuWorker = new ScheduleWorker({ minute: 15 }, pingPongHerokuHandler),
            secondHerokuWorker = new ScheduleWorker({ minute: 45 }, pingPongHerokuHandler),
            saveStatsWorker = new ScheduleWorker({ minute: 0 }, saveStatsHandler),
            maxUsersWorker = new ScheduleWorker({ minute: 1 }, maxUsersCalculator);


        setInterval(function(){
            bus.emit(bus.list.COUNTER.SAVE_OFTEN);
        }, 300000);
    });
}
