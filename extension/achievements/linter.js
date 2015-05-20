define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
        _ = brackets.getModule('thirdparty/lodash'),
        locale = require('../services/locale'),
        ExtensionsService = require('../services/extensions');

    function HTMLAchievement(){
        this.calculate = function(extensions){
            var regexp = /((\s|\b)linter(\s|\b)|(\s|\b)csslint(\s|\b)|(\s|\b)jslint(\s|\b)|(\s|\b)lint(\s|\b)|(\s|\b)jshint(\s|\b))/i;

            _.chain(extensions).filter(function(extension){
                return regexp.test(extension.description) || regexp.test(extension.title);
            }).map(function(extension){
                this.writeBadge(null, extension);
            }, this);
        }

        this.getTag = function(rating, element){
            return _.template('<span title="${title}" class="ext-badge ext-badge-lint">Linter</span>')({
                badge: locale.get('badgeLint'),
                title: locale.get('badgeLintTitle')
            });
        }
    }

    HTMLAchievement.prototype = Achievement;
    module.exports = HTMLAchievement;
});
