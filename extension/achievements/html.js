define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
        _ = brackets.getModule('thirdparty/lodash'),
        locale = require('../services/locale'),
        ExtensionsService = require('../services/extensions');

    function HTMLAchievement(){
        this.calculate = function(extensions){
            var regexp = /(\s|\b)html(\s|\b)/i;

            _.chain(extensions).filter(function(extension){
                return regexp.test(extension.description) || regexp.test(extension.title);
            }).map(function(extension){
                this.writeBadge(null, extension);
            }, this);
        }

        this.getTag = function(rating, element){
            return _.template('<span title="${title}" class="ext-badge ext-badge-html">HTML</span>')({
                badge: locale.get('badgeHTML'),
                title: locale.get('badgeHTMLTitle')
            });
        }
    }

    HTMLAchievement.prototype = Achievement;
    module.exports = HTMLAchievement;
});
