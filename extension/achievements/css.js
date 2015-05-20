define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
        _ = brackets.getModule('thirdparty/lodash'),
        locale = require('../services/locale'),
        ExtensionsService = require('../services/extensions');

    function CSSAchievement(){
        this.calculate = function(extensions){
            var regexp = /((\s|\b)css(\s|\b)|(\s|\b)less(\s|\b)|(\s|\b)SASS(\s|\b))/i;

            _.chain(extensions).filter(function(extension){
                return regexp.test(extension.description) || regexp.test(extension.title);
            }).map(function(extension){
                this.writeBadge(null, extension);
            }, this);
        }

        this.getTag = function(rating, element){
            return _.template('<span title="${title}" class="ext-badge ext-badge-css">[C]SS</span>')({
                badge: locale.get('badgeCSS'),
                title: locale.get('badgeCSSTitle')
            });
        }
    }

    CSSAchievement.prototype = Achievement;
    module.exports = CSSAchievement;
});
