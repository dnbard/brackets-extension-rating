'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SettingSchema = new Schema({
    version: { type:Number, default: -1 }
});

var Setting = mongoose.model('Setting', SettingSchema);
