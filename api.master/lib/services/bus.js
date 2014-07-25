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
        REGISTRY:{
            UPDATED:'Registry updated',
            CACHED: 'Registry cached'
        }
    }
}

module.exports = getInstance();
