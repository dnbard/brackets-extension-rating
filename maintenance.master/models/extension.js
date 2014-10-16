'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExtensionSchema = new Schema({
    _id: { type: String, index: true },
    title: String,
    description: String,
    author: String,
    authorAvatar: String,
    homepage: String,
    version: String,
    stars: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
    githubTimestamp: Date,
    totalDownloads: Number,
    downloads: [{
        count: Number,
        timestamp: { type: Date, default: Date.now }
    }],
    repository: String
});

mongoose.model('Extension', ExtensionSchema);