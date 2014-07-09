define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
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

        this.tag = '<img src="'+config.root + 'images/badge_gold_small.png"/>';
    }

    MostDownloadsAchievement.prototype = Achievement;

    module.exports = MostDownloadsAchievement;
});
