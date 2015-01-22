'use strict';

var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: String,
    online: { type: Number, default: 0 },
    maxUsers: { type: Number, default: 0 },
    dailyUsers: String,
    update: { type: Date, index: true }
});

mongoose.model('Application', Schema);
