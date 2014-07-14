'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExtensionSchema = new Schema({
    _id: { type: String, index: true },
    title: String,
    description: String,
    author: String,
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
    }]
});

var Extension = mongoose.model('Extension', ExtensionSchema);

exports.stream = function(query){
    query = query || {};

    return Extension.find(query).stream();
}

exports.process = function(extension, callback){
    var id = extension.metadata.name;

    Extension.findById(id, function(err, ext){
        if (!ext){
            ext = new Extension({
                _id: extension.metadata.name,
                title: extension.metadata.title,
                author: extension.metadata.author? extension.metadata.author.name: '',
                description: extension.metadata.description,
                homepage: extension.metadata.homepage,
                version: extension.metadata.version,
                downloads: [{count:extension.totalDownloads}],
                totalDownloads: extension.totalDownloads
            });

            ext.save(callback);
        } else {
            ext.title = extension.metadata.title;
            ext.author = extension.metadata.author? extension.metadata.author.name: '';
            ext.description = extension.metadata.description;
            ext.homepage = extension.metadata.homepage;
            ext.version = extension.metadata.version;
            ext.totalDownloads = extension.totalDownloads;
            ext.downloads.push({count: extension.totalDownloads});

            ext.save(callback);
        }
    });
}
