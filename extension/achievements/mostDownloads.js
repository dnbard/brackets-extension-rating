define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
        _ = require('../vendor/lodash.min'),
        numberOfTopExtensoins = 7;

    function MostDownloadsAchievement(){
        this.calculate = function(extensions){
            extensions = _.sortBy(extensions, function(el){
                return el.totalDownloads?
                    - el.totalDownloads:
                    0;
            });

            for (var i = 0; i < numberOfTopExtensoins; i ++){
                if (!extensions[i]){
                    break;
                }
                this.writeBadge(i, extensions[i]);
            }
        }

        this.getTag = function(rating){
            return '<span title="Most popular extension" class="ext-badge ext-badge-top">Top</span>';
        }
    }

    MostDownloadsAchievement.prototype = Achievement;

    module.exports = MostDownloadsAchievement;
});
