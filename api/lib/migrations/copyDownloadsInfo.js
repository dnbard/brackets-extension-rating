var _ = require('lodash'),
    mongoose = require('mongoose'),
    Extension = mongoose.model('Extension');

module.exports = function copyDownloadsInfo(callback){
    var stream = Extension.find({}).stream();

    stream.on('data', function(extension){
        if (!extension.downloads || !_.isArray(extension.downloads)){ return; }

        _.each(extension.downloads, function(downloadStat){
            var download = new Download({
                count: downloadStat.count,
                timestamp: downloadStat.timestamp,
                extension: extension._id
            });

            download.save();
        });

        extension.downloads = undefined;
        extension.save();
    });

    stream.on('close', function(){
        callback(null);
    });

    stream.on('error', function(err){
        callback(err);
    });
}
