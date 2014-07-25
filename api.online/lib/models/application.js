'use strict';

var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: String
});

mongoose.model('Application', Schema);
