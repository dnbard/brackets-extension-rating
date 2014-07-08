define(function(require, exports, module){
    var Achievement = require('./achievement'),
        _ = require('../vendor/lodash.min');

    function MostDownloadsAchievement(){
        this.calculate = function(extensions){
            extensions = _.sortBy(extensions, function(el){
                return - el.totalDownloads;
            });

            for (var i = 0; i < 3; i ++){
                if (!extensions[i]){
                    break;
                }
                this.writeBadge(i, extensions[i]);
            }
        }
    }

    MostDownloadsAchievement.prototype = Achievement;

    module.exports = MostDownloadsAchievement;
});
