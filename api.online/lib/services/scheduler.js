var ScheduleWorker = require('./worker'),
    migrations = require('./migrations'),
    bus = require('./bus');

function saveStatsHandler(){
    bus.emit(bus.list.COUNTER.SAVE);
}

function maxUsersCalculator(){
    bus.emit(bus.list.APPLICATION.MAX_USERS);
}

exports.init = function(){
    migrations.do().then(function(){
        var saveStatsWorker = new ScheduleWorker({ minute: 0 }, saveStatsHandler),
            maxUsersWorker = new ScheduleWorker({ minute: 1 }, maxUsersCalculator);


        setInterval(function(){
            bus.emit(bus.list.COUNTER.SAVE_OFTEN);
        }, 1000 * 10);
    });
}
