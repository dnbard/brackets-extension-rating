define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
        _ = brackets.getModule('thirdparty/lodash'),
        locale = require('../services/locale'),
        ExtensionsService = require('../services/extensions');

    function JSAchievement(){
        this.calculate = function(extensions){
            var regexp = /((\s|\b)js(\s|\b)|javascript)/i;

            _.chain(extensions).filter(function(extension){
                return regexp.test(extension.description) || regexp.test(extension.title);
            }).map(function(extension){
                this.writeBadge(null, extension);
            }, this);
        }

        this.getTag = function(rating, element){
            return _.template('<span title="${title}" class="ext-badge ext-badge-adobe">JS</span>')({
                badge: locale.get('badgeAdobe'),
                title: locale.get('badgeAdobeTitle')
            });
        }
    }

    JSAchievement.prototype = Achievement;
    module.exports = JSAchievement;
});
