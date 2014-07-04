define(function (require, exports, module){
    var _ = require('../vendor/lodash.min'),
        q = require('../vendor/q'),
        github = require('./github'),
        amazon = require('./amazon'),
        extensions = null;

    exports.get = function(id){
        if (!extensions || extensions.length === 0) { return null; }
        return extensions[id];
    }

    exports.updateRegistry = function(callback){
        var defer = q.defer();

        amazon.getRegistry()
            .then(function(data){
                extensions = data;
                defer.resolve(data);
            }, function(){
                console.error('Can\'t get registry from Amazon');
                defer.reject();
            });
        return defer.promise;
    }

    exports.updateRegistry();
});
