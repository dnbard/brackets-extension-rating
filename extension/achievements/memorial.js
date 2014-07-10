define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
        _ = require('../vendor/lodash.min'),
        dictionary = {
            'themesforbrackets': { tag: '<span>100k</span>' }
        };

    function MemorialAchievement(){
        this.calculate = function(extensions){
            var dictionaryKeys = _.keys(dictionary);

            _.each(extensions, _.bind(function(extension){
                if (_.contains(dictionaryKeys, extension._id)){
                    this.writeBadge(null, extension);
                }
            }, this));
        }

        this.getTag = function(rating, element){
            var id = element.attr('data-extension-id'),
                badge;

            if (!id){ return ''; }
            badge = dictionary[id];
            if (!badge){ return ''; }

            return badge.tag;
        }
    }

    MemorialAchievement.prototype = Achievement;

    module.exports = MemorialAchievement;
});
