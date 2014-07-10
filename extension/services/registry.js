define(function(require, exports, module){
    var registry = {},
        _ = require('../vendor/lodash.min'),
        config = require('../config'),
        achievements = [],
        MostDownloadsAchievement = require('../achievements/mostDownloads'),
        MostTrendingAchievement = require('../achievements/mostTrending'),
        MemorialAchievement = require('../achievements/memorial'),
        UpdatedAchievement = require('../achievements/updated'),
        NewExtensionAchievement = require('../achievements/new'),
        AuthorAchievement = require('../achievements/author'),
        AdobeAchievement = require('../achievements/adobe'),
        state = config.state;

    function getDownloadsCounterByDate(array, date){
        if (!date){
            return array[array.length - 1];
        }

        date = new Date(date);

        for(var i = array.length - 1; i >= 0; i --){
            var element = array[i],
                elDate = new Date(element.timestamp),
                hours = Math.abs(date - elDate) / 36e5;

            if (hours > 23 || i === 0){
                return element;
            }
        }
        return null;
    }

    function registerAchievements(){
        _.each(achievements, function(achievement){
            achievement.calculate(registry);
        });
    }

    exports.init = function(){
        var path = state === 'production'?
            'http://brackets-rating.herokuapp.com/':
            'http://localhost:9000/';

        if (achievements.length === 0){
            achievements.push(new MostDownloadsAchievement());
            achievements.push(new MostTrendingAchievement());
            achievements.push(new MemorialAchievement());
            achievements.push(new NewExtensionAchievement());
            achievements.push(new UpdatedAchievement());
            achievements.push(new AuthorAchievement());
            achievements.push(new AdobeAchievement());
        }

        $.ajax({
            url: path + 'ratings/'
        }).success(function(extensions){
            _.each(extensions, function(extension){
                var downloadsListSize = extension.downloads.length;
                if (downloadsListSize <= 1) {
                    extension.dailyDownloads = 0;
                } else {
                    var today = getDownloadsCounterByDate(extension.downloads),
                        yesterday = getDownloadsCounterByDate(extension.downloads, today.timestamp);
                    extension.dailyDownloads = today && yesterday? today.count - yesterday.count : 0;
                }
                registry[extension._id] = extension;
            });
            registerAchievements();

            //update registry once a hour
            setTimeout(exports.init, 60 * 60 * 1000 /*1 hour */);
        });
    }

    exports.get = function(id){
        return registry[id];
    }
});
