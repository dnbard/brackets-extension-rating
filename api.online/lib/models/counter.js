'use strict';

var mongoose = require('mongoose');

function getCurrentDate(){
    return Date.now;
}

var Schema = new mongoose.Schema({
    update: { type: Date, expires: '1.1h', default: Date.now },
    application: { type: String, index: true },
    user: { type: String, index: true }
});

mongoose.model('Counters', Schema);
