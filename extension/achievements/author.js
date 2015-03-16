define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
        _ = brackets.getModule('thirdparty/lodash'),
        ExtensionsService = require('../services/extensions');

    function AuthorAchievement(){
        this.calculate = function(extensions){
            var grouped = _.groupBy(extensions, function(ext){
                return ext.author || 'undefined';
            });

            //remove extensions without authors from list
            grouped['undefined'] = [];

            grouped = _.sortBy(grouped, function(g){
                return - g.length || 0;
            });

            _.each(grouped[0], _.bind(function(extension){
                this.writeBadge(null, extension);
            }, this));
        }

        this.getTag = function(rating, element){
            return '<span>Author!</span>';
        }
    }

    AuthorAchievement.prototype = Achievement;
    module.exports = AuthorAchievement;
});
