var mongoose = require('mongoose'),
    Counter = mongoose.model('Counter');

var counters = [];

exports.tick = function(counter){
    if (typeof counter !== 'string'){
        throw new Error('Invalid argument');
    }

    if (counters[counter] === undefined){
        counters[counter] = 1;
    } else {
        counters[counter] ++;
    }
}

exports.get = function(counter){
    if (typeof counter !== 'string'){
        throw new Error('Invalid argument');
    }

    return counters[counter] || 0;
}

exports.save = function(topic){
    if (typeof topic !== 'string'){
        throw new Error('Invalid argument');
    }

    var counter = new Counter({
        count: counters[topic],
        topic: topic
    });

    counter.save();
    counters[topic] = 0;
}
