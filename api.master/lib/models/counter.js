'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CounterSchema = new Schema({
    count: Number,
    timestamp: { type: Date, default: Date.now, index:true },
    topic: { type: String, index: true }
});

var Counter = mongoose.model('Counter', CounterSchema);
