define(function (require, exports, module){
    var _ = require('thirdparty/lodash'),
        q = require('../vendor/q'),
        github = require('./github'),
        amazon = require('./amazon'),
        extensions = null,
        registryUpdatedPromise = q.defer();

    exports.get = function(id){
        if (!extensions || extensions.length === 0) { return null; }
        return extensions[id];
    }

    exports.updateRegistry = function(){
        amazon.getRegistry()
            .then(function(data){
                extensions = data;
                registryUpdatedPromise.resolve(data);
            }, function(){
                console.error('Can\'t get registry from Amazon');
                registryUpdatedPromise.reject();
            });
        return registryUpdatedPromise.promise;
    }

    exports.isRegistryLoaded = function(){
        return registryUpdatedPromise.promise;
    }

    exports.updateRegistry();
});
