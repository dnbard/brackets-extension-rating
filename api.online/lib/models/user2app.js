'use strict';

var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    user: { type: String, index: true },
    app: { type: String, index: true }
});

mongoose.model('user2app', Schema);
