var path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    config = require('./config'),
    _ = require('lodash'),
    q = require('q');

function connectToDatabase(){
    var defer = q.defer();
    
    mongoose.connect(config.mongo, function(){
        console.log('Connected to database');

        var modelsPath = path.join(__dirname, '/models'),
            models = fs.readdirSync(modelsPath),
            modelsCount = 0;
        
        models.forEach(function (file) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(modelsPath + '/' + file);
            }

            console.log('Database model "%s" injected', file.replace('.js', ''));
            
            modelsCount++;
            
            if (modelsCount === models.length){
                defer.resolve();
            }
        });
    });
    
    return defer.promise;
}

connectToDatabase().then(function(){
    var Extension = mongoose.model('Extension');
    
    q.all([Extension.find({})
        .lean()
        .exec()])
        .then(function(result){
            var extensions = result[0],
                index = 0;
        
            function processHandler(){
                index ++;
                if (index === extensions.length){
                    process.exit();
                } else {
                    processExtension(extensions[index], index, extensions.length).then(processHandler);
                }
            }
        
            console.log('Found %s extensions', extensions.length);
            
            processExtension(extensions[index], index, extensions.length).then(processHandler);
        });
});

function processExtension(extension, index, max){
    var Download = mongoose.model('Download'),
        now = new Date(),
        defer = q.defer(),
        checkDate;
    
    function _process(){
        var defer = q.defer();
        
        Download.find({ extension: extension._id })
            .sort({timestamp: -1})
            .exec()
            .then(function(downloads){
                var toDelete = 0,
                    downloadMax = downloads.length,
                    downloadCount = 0;

                _.each(downloads, function(download){
                    var downloadDate = new Date(download.timestamp);

                    if (!checkDate){
                        checkDate = downloadDate;
                    }

                    var hours = Math.abs(now - downloadDate) / 36e5,
                        checkHours = Math.abs(checkDate - downloadDate) / 36e5;

                    if (hours > 48){
                        if (checkHours < 23 && checkHours !== 0){
                            download.remove(function(err){
                                if (err){
                                    console.log(err);
                                    process.exit();
                                } else {
                                    toDelete ++;
                                    
                                    downloadCount++;
                                    if (downloadMax === downloadCount){
                                        defer.resolve({
                                            downloads: downloads.length,
                                            toDelete: toDelete
                                        });
                                    }
                                }
                            });
                        } else {
                            checkDate = downloadDate;
                            
                            downloadCount++;
                            if (downloadMax === downloadCount){
                                defer.resolve({
                                    downloads: downloads.length,
                                    toDelete: toDelete
                                });
                            }
                        }
                    } else {
                        downloadCount++;
                        if (downloadMax === downloadCount){
                            defer.resolve({
                                downloads: downloads.length,
                                toDelete: toDelete
                            });
                        }
                    }
                });
            });
        
        return defer.promise;
    }
    
    console.log('Processing %s [%s / %s]', extension._id, index + 1, max);
    
    _process().then(function(result){
        console.log('Extension %s - %s entities(mark to delete %s)', extension._id, result.downloads, result.toDelete);
        defer.resolve();
    });
    
    return defer.promise;
}