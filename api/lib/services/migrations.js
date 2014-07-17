var _ = require('lodash'),
    mongoose = require('mongoose'),
    Extension = mongoose.model('Extension'),
    Download = mongoose.model('Download');

exports.downloadsEmpty = function(){
    //empty downloads database
    Download.remove({}, function(err) {
       console.log('collection removed');
    });
}

exports.copyDownloadsInfo = function(){
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

        extension.downloads = null;
        extension.save();

        console.log(extension._id);
    });
}
