define(function (require, exports, module){
    var _ = require('../vendor/lodash.min'),
        q = require('../vendor/q'),
        now = new Date(),
        remainingAttempts = 9999;

    exports.isAvailable = function(){
        return remainingAttempts > 0;
    }

    exports.get = function(extension){
        if (!_.isObject(extension)){
            throw new Error('Invalid argument');
        }

        var defer = q.defer(),
            url = extension.repository.replace('http://', 'https://')
                .replace('github.com', 'api.github.com/repos');

        if ((!extension.timestamp || now - extension.timestamp > 1) && remainingAttempts > 0){
            extension.timestamp = now;

            $.ajax({
                url: url
            }).success(function(repo, status, xhq){
                attemptChecker(xhq);

                if (!repo.stargazers_count && repo.stargazers_count !== 0){
                    defer.reject({ extension: extension });
                }

                defer.resolve({
                    repo: repo,
                    extension: extension
                });
            }).error(function(err, status, xhq){
                attemptChecker(xhq);

                defer.reject({ extension: extension });
            });
        } else {
            defer.reject({ extension: extension });
        }

        return defer.promise;
    }

    function attemptChecker(xhq){
        if (!xhq || !xhq.getResponseHeader) { return; }

        var rateLimit = parseInt(xhq.getResponseHeader('X-RateLimit-Remaining'));
        if (rateLimit == NaN){
            console.log(xhq);
            rateLimit = 0;
        }
        if (_.isNumber(rateLimit) && remainingAttempts > rateLimit){
            remainingAttempts = rateLimit;
            console.log(rateLimit + ' requests to GitHub remaining');
        }
    }
});
