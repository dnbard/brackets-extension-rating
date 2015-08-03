define(function(require, exports, module){
    var registry = {},
        _ = brackets.getModule('thirdparty/lodash'),
        config = require('../config'),
        ExtensionService = require('./extensions'),
        achievements = [],
        MostDownloadsAchievement = require('../achievements/mostDownloads'),
        MostTrendingAchievement = require('../achievements/mostTrending'),
        MemorialAchievement = require('../achievements/memorial'),
        UpdatedAchievement = require('../achievements/updated'),
        NewExtensionAchievement = require('../achievements/new'),
        AuthorAchievement = require('../achievements/author'),
        AdobeAchievement = require('../achievements/adobe'),
        MostStarsAchievement = require('../achievements/mostStars'),
        MostForksAchievement = require('../achievements/mostForks'),
        ThemeAchievement = require('../achievements/theme'),
        AchievementFactory = require('../achievements/factory'),
        locale = require('./locale'),
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
            'http://extensions-dnbard.rhcloud.com/':
            'http://localhost:9000/';

        if (achievements.length === 0){
            achievements.push(new ThemeAchievement());
            achievements.push(new MostDownloadsAchievement());
            achievements.push(new MostTrendingAchievement());
            achievements.push(new MemorialAchievement());
            achievements.push(new NewExtensionAchievement());
            achievements.push(new AdobeAchievement());
            achievements.push(new MostStarsAchievement());
            achievements.push(new MostForksAchievement());

            achievements.push(AchievementFactory.create({
                regexp: /((\s|\b)coffeescript(\s|\b)|(\s|\b)coffee(\s|\b)|(\s|\b)js(\s|\b)|javascript)/i,
                fields: [ 'title', 'description' ],
                badge: locale.get('badgeJS'),
                class: 'ext-badge-js',
                title: locale.get('badgeJSTitle')
            }));

            achievements.push(AchievementFactory.create({
                regexp: /((\s|\b)css(\s|\b)|(\s|\b)less(\s|\b)|(\s|\b)SASS(\s|\b))/i,
                fields: [ 'title', 'description' ],
                badge: locale.get('badgeCSS'),
                class: 'ext-badge-css',
                title: locale.get('badgeCSSTitle')
            }));

            achievements.push(AchievementFactory.create({
                regexp: /(\s|\b)html(\s|\b)/i,
                fields: [ 'title', 'description' ],
                badge: locale.get('badgeHTML'),
                class: 'ext-badge-html',
                title: locale.get('badgeHTMLTitle')
            }));

            achievements.push(AchievementFactory.create({
                regexp: /((\s|\b)linter(\s|\b)|(\s|\b)csslint(\s|\b)|(\s|\b)jslint(\s|\b)|(\s|\b)lint(\s|\b)|(\s|\b)jshint(\s|\b))/i,
                fields: [ 'title', 'description' ],
                badge: locale.get('badgeLint'),
                class: 'ext-badge-lint',
                title: locale.get('badgeLintTitle')
            }));

            achievements.push(AchievementFactory.create({
                regexp: /(\s|\b)git(\s|\b)/i,
                fields: [ 'title' ],
                badge: locale.get('badgeGit'),
                class: 'ext-badge-git',
                title: locale.get('badgeGitTitle')
            }));

            achievements.push(AchievementFactory.create({
                regexp: /((\s|\b)php(\s|\b)|(\s|\b)wordpress(\s|\b))/i,
                fields: [ 'title', 'description' ],
                badge: 'PHP',
                class: 'ext-badge-php',
                title: 'PHP'
            }));

            achievements.push(AchievementFactory.create({
                regexp: /(\s|\b)jade(\s|\b)/i,
                fields: [ 'title', 'description' ],
                badge: 'jade',
                class: 'ext-badge-jade',
                title: 'jade'
            }));
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
                    if (yesterday && !yesterday.count){ yesterday.count = 0; }

                    extension.dailyDownloads = today && yesterday? today.count - yesterday.count : 0;
                }
                registry[extension._id] = extension;
            });
            ExtensionService.isRegistryLoaded().then(function(){
                registerAchievements();
            });

            //update registry once a hour
            setTimeout(exports.init, 60 * 60 * 1000 /*1 hour */);
        });
    }

    exports.get = function(id){
        return registry[id] || {title: ""};
    }
});
