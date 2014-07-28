'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ServiceSchema = new Schema({
    url: String,
    type: { type: String, index: true },
    trusted: Boolean,
    email: String
});

mongoose.model('Service', ServiceSchema);
