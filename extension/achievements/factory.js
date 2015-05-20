define(function(require, exports, module){
    var Achievement = require('./achievement'),
        _ = brackets.getModule('thirdparty/lodash'),
        locale = require('../services/locale');

    function createAchievement(options){
        var genericAchievement = {};

        genericAchievement.name = options.badge;
        genericAchievement.writeBadge = Achievement.writeBadge;
        genericAchievement.calculate = function(extensions){
            var regexp = options.regexp;

            _.chain(extensions).filter(function(extension){
                return _.chain(options.fields).map(function(field){
                    return regexp.test(extension[field]);
                }).reduce(function(prev, curr){
                    return prev || curr;
                }).value();
            }).map(function(extension){
                this.writeBadge(null, extension);
            }, genericAchievement);
        };

        genericAchievement.getTag = function(rating, element){
            return _.template('<span title="${title}" class="ext-badge ${cname}">${badge}</span>')({
                badge: options.badge,
                title: options.title,
                cname: options.class,
            });
        }

        return genericAchievement;
    }

    return {
        create: createAchievement
    };
});
