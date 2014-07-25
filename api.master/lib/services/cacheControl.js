var bus = require('./bus'),
    _ = require('lodash');

exports.init = function(){
    bus.on(bus.list.REGISTRY.CACHED, function(registry){
        _.each(registry, function(entry){
            if (!entry.downloads) { return true; }
            var today = new Date(),
                toDelete = [];

            _.each(entry.downloads, function(value, i){
                if (i === entry.downloads.length - 1) { return true; }
                if (i === 0 ) { return true; }

                var elDate = new Date(entry.downloads[i].timestamp),
                    hours = (Math.abs(today - elDate) / 36e5).toFixed(0);

                if (hours % 24 == 0) { return true; }
                toDelete.push(value);
            });

            _.each(toDelete, function(value){
                entry.downloads.splice(entry.downloads.indexOf(value), 1);
            });
        });
    });
}
