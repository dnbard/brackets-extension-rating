var schedule = require('node-schedule');

function ScheduleWorker(rule, handler, executeImmediately){
    if (typeof handler !== 'function'){
        throw new Error('Handler must be a function');
    }

    if (rule === null && executeImmediately){
        handler();
        return;
    }

    this.rule = rule;
    this.job = schedule.scheduleJob(rule, handler);

    if (executeImmediately){ handler(); }
}

ScheduleWorker.prototype.cancel = function(){
    this.job.cancel();
}

module.exports = ScheduleWorker;
