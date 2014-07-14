define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
        _ = require('../vendor/lodash.min'),
        ExtensionsService = require('../services/extensions');

    function AdobeAchievement(){
        this.calculate = function(extensions){
            var regexp = /adobe/;
                _.each(extensions, _.bind(function(extension){
                if (regexp.test(extension.homepage)){
                    this.writeBadge(null, extension);
                }
            }, this));
        }

        this.getTag = function(rating, element){
            return '<img src="' + config.root + 'images/adobe.png" />';
        }
    }

    AdobeAchievement.prototype = Achievement;
    module.exports = AdobeAchievement;
});
