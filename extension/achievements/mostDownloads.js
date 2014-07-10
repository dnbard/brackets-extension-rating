define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
        _ = require('../vendor/lodash.min');

    function MostDownloadsAchievement(){
        this.calculate = function(extensions){
            extensions = _.sortBy(extensions, function(el){
                return el.totalDownloads?
                    - el.totalDownloads:
                    0;
            });

            for (var i = 0; i < 3; i ++){
                if (!extensions[i]){
                    break;
                }
                this.writeBadge(i, extensions[i]);
            }
        }

        this.getTag = function(rating){
            return '<img src="'+config.root + 'images/top.png"/>';
        }
    }

    MostDownloadsAchievement.prototype = Achievement;

    module.exports = MostDownloadsAchievement;
});
