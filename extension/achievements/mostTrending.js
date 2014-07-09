define(function(require, exports, module){
    var Achievement = require('./achievement'),
        _ = require('../vendor/lodash.min');

    function MostTrendingAchievement(){
        this.calculate = function(extensions){
            extensions = _.sortBy(extensions, function(el){
                return el.dailyDownloads?
                    - el.dailyDownloads:
                    0;
            });

            for (var i = 0; i < 3; i ++){
                if (!extensions[i]){
                    break;
                }
                this.writeBadge(i, extensions[i]);
            }
        }

        this.tag = '<span>Trending</span>';
    }

    MostTrendingAchievement.prototype = Achievement;

    module.exports = MostTrendingAchievement;
});
