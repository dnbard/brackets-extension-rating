define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
        _ = require('thirdparty/lodash'),
        ExtensionsService = require('../services/extensions');

    function UpdatedAchievement(){
        this.calculate = function(extensions){
            _.each(extensions, _.bind(function(extension){
                var regEntry = ExtensionsService.get(extension._id),
                    published, hours;

                if (!regEntry || !regEntry.versions || regEntry.versions.length <= 1){
                    return true;
                } else {
                    published = new Date(regEntry.versions[regEntry.versions.length - 1].published);
                    hours = Math.abs(new Date() - published) / 36e5;

                    if (hours < 24 * 3){
                        this.writeBadge(null, extension);
                    }
                }
            }, this));
        }

        this.getTag = function(rating, element){
            return '<img src="'+config.root + 'images/update.png"/>';
        }
    }

    UpdatedAchievement.prototype = Achievement;
    module.exports = UpdatedAchievement;
});
