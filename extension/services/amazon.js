define(function (require, exports, module){
    var q = require('../vendor/q'),
        _ = require('../vendor/lodash.min');

    exports.getRegistry = function(){
        var defer = q.defer(),
            registryPathTemplate = 'https://s3.amazonaws.com/extend.brackets/registry.json?_=${date}';

        $.ajax({
            url: _.template(registryPathTemplate, {
                date: new Date().getTime()
            })
        }).success(function(data){
            defer.resolve(data);
        }).error(function(){
            defer.reject();
        });

        return defer.promise;
    }
});
