var request = require('request'),
    Q = require('q'),
    _ = require('lodash'),
    bus = require('./bus'),
    cache = require('./cache'),
    userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36',
    mongoose = require('mongoose'),
    Extension = require('../models/extension');

var routes = {
    limit: 'https://api.github.com/rate_limit'
}

function init(app){
    bus.on(bus.list.REGISTRY.CACHED, onRegistryCached);
}

function onRegistryCached(registry){
    knowYourLimits().then(function(data){
        if (data.resources && data.resources.core){
            var remaining = data.resources.core.remaining,
                reset = data.resources.core.reset;

            console.log('GitHub requests remaining: ' + remaining + ', reset at ' + new Date(reset * 1000));
            onRemaining(remaining, registry);
        } else {
            onRemaining(0, registry);
        }
    }, function(err){
        onRemaining(0, registry);
    });
}

function onRemaining(remaining, registry){
    var extensions = _.shuffle(registry);
    if (remaining <= 0) return;

    _.each(extensions, function(extension){
        try{
            if (typeof extension.homepage !== 'string'){ return true; }

            var id = extension._id,
                repository = extension.repository || extension.homepage.replace('github.com', 'api.github.com/repos'),
                today = new Date().getDate();

            if (remaining > 0){
                remaining --;
                getGitHubInfo(repository, extension).then(function(data){
                    extension.stars = data.stargazers_count || 0;
                    extension.forks = data.forks || 0;
                    extension.githubTimestamp = new Date().toISOString();
                    if (data.owner && typeof data.owner.avatar_url === 'string'){
                        extension.authorAvatar = data.owner.avatar_url;
                    }

                    Extension.updateGitHub({
                        id: id,
                        stars: extension.stars,
                        forks: extension.forks,
                        authorAvatar: extension.authorAvatar || null
                    });

                    console.log(id);
                });
            }

            if (remaining <= 0){
                return false;
            }
        } catch(e){
            console.log(e);
        }
    });
}

function getGitHubInfo(repoUrl, extension){
    var defer = Q.defer();

    if (typeof repoUrl !== 'string' || repoUrl.indexOf('github.com') === -1){
        defer.reject();
        return defer.promise;
    }

    if (repoUrl.indexOf('http') === -1){
        repoUrl = 'http://' + repoUrl;
    }

    request({
        url: repoUrl,
        headers:{
            'User-Agent': userAgent
        }
    }, function(err, response, body){
        if (err){
            console.log(err);
            defer.reject(err);
        } else {
            if (typeof body === 'string'){
                try{
                    body = JSON.parse(body);
                } catch (e){
                    defer.reject(e);
                }
            }
            defer.resolve(body);
        }
    });

    return defer.promise;
}

function knowYourLimits(){
    var defer = Q.defer();
    request({
        url: routes.limit,
        headers: {
            'User-Agent': userAgent
        }
    }, function(err, response, body){
        if (err){
            defer.reject(err);
        } else {
            if (typeof body === 'string'){
                body = JSON.parse(body);
            }
            defer.resolve(body);
        }
    });

    return defer.promise;
}

module.exports = init;
