var instance = null;

function getInstance(){
    var EventEmitter;

    if (!instance){
        EventEmitter = require('events').EventEmitter;
        instance = new EventEmitter();
        init(instance);
    }
    return instance;
}

function init(instance){
    instance.list = {
        COUNTER: {
            SAVE: 'counter.save',
            SAVE_OFTEN: 'counter.save.often'
        },
        APPLICATION:{
            SAVE: 'application.save',
            ZERO_ONLINE: 'application.zero_online',
            MAX_USERS: 'application.max_users'
        }
    }
}

module.exports = getInstance();
