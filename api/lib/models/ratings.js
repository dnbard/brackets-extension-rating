'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RatingSchema = new Schema({
    _id: { type: String, index: true },
    name: String,
    author: String,
    url: String,
    stars: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});

var Rating = mongoose.model('Rating', RatingSchema);

RatingSchema.statics.fromExtension = function(extension, cb){
    var rating = new Rating({
        _id: extension.id,
        name: extension.name,
        author: extension.author,
        url: extension.repository,
        stars: extension.stars || 0,
        forks: extension.forks || 0
    });
    
    rating.save(cb);
}