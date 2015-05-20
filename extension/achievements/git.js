define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
        _ = brackets.getModule('thirdparty/lodash'),
        locale = require('../services/locale'),
        ExtensionsService = require('../services/extensions');

    function GitAchievement(){
        this.calculate = function(extensions){
            var regexp = /(\s|\b)git(\s|\b)/i;

            _.chain(extensions).filter(function(extension){
                return regexp.test(extension.title);
            }).map(function(extension){
                this.writeBadge(null, extension);
            }, this);
        }

        this.getTag = function(rating, element){
            return _.template('<span title="${title}" class="ext-badge ext-badge-git">${badge}</span>')({
                badge: locale.get('badgeGit'),
                title: locale.get('badgeGitTitle')
            });
        }
    }

    GitAchievement.prototype = Achievement;
    module.exports = GitAchievement;
});
