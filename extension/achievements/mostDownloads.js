define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
        _ = require('../vendor/lodash.min'),
        locale = require('../services/locale'),
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
            return _.template('<span title="${title}" class="ext-badge ext-badge-top">${badge}</span>',{
                badge: locale.get('badgeTop'),
                title: locale.get('badgeTopTitle')
            });
        }
    }

    MostDownloadsAchievement.prototype = Achievement;

    module.exports = MostDownloadsAchievement;
});
