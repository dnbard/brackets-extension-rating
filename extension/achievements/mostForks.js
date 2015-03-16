define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
        _ = brackets.getModule('thirdparty/lodash'),
        locale = require('../services/locale'),
        numberOfTopExtensoins = 7;

    function MostForksAchievement(){
        this.calculate = function(extensions){
            extensions = _.sortBy(extensions, function(el){
                return el.forks?
                    - el.forks:
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
            return _.template('<span title="${title}" class="ext-badge ext-badge-forks"><i class="fa fa-code-fork"></i></span>',{
                title: locale.get('badgeForksTitle')
            });
        }
    }

    MostForksAchievement.prototype = Achievement;

    module.exports = MostForksAchievement;
});
