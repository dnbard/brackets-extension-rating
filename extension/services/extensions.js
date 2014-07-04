define(function (require, exports, module){
    var _ = require('../vendor/lodash.min'),
        github = require('./github'),
        amazon = require('./amazon'),
        extensions = null;

    exports.get = function(id){
        if (!extensions || extensions.length === 0) { return null; }
        return extensions[id];
    }

    exports.updateRegistry = function(callback){
        amazon.getRegistry()
            .then(function(data){
                extensions = data;

                if (typeof callback === 'function'){
                    callback(null, data);
                }
            }, function(){
                console.error('Can\'t get registry from Amazon');

                if (typeof callback === 'function'){
                    callback(true);
                }
            });
    }

    exports.updateRegistry();
});
