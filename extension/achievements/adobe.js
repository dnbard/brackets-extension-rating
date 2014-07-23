define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
        _ = require('../vendor/lodash.min'),
        locale = require('../services/locale'),
        ExtensionsService = require('../services/extensions');

    function AdobeAchievement(){
        this.calculate = function(extensions){
            var regexp = /adobe/;
                _.each(extensions, _.bind(function(extension){
                if (regexp.test(extension.homepage) || extension.author.toLowerCase().indexOf('adobe') >= 0){
                    this.writeBadge(null, extension);
                }
            }, this));
        }

        this.getTag = function(rating, element){
            return _.template('<span title="${title}" class="ext-badge ext-badge-adobe">${badge}</span>',{
                badge: locale.get('badgeAdobe'),
                title: locale.get('badgeAdobeTitle')
            });
        }
    }

    AdobeAchievement.prototype = Achievement;
    module.exports = AdobeAchievement;
});
