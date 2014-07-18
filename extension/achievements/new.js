define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
        _ = require('../vendor/lodash.min'),
        ExtensionsService = require('../services/extensions');

    function UpdatedAchievement(){
        this.calculate = function(extensions){
            _.each(extensions, _.bind(function(extension){
                var regEntry = ExtensionsService.get(extension._id),
                    published, hours;

                if (!regEntry || !regEntry.versions || !regEntry.versions.length || regEntry.versions.length === 0){
                    this.writeBadge(null, extension);
                } else {
                    published = new Date(regEntry.versions[0].published);
                    hours = Math.abs(new Date() - published) / 36e5;

                    if (hours < 24 * 3){
                        this.writeBadge(null, extension);
                    }
                }
            }, this));
        }

        this.getTag = function(rating, element){
            return '<span title="New extension" class="ext-badge ext-badge-new">New</span>';
        }
    }

    UpdatedAchievement.prototype = Achievement;
    module.exports = UpdatedAchievement;
});
