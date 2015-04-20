define(function (require, exports, module){
    var q = require('../vendor/q'),
        _ = brackets.getModule('thirdparty/lodash');

    exports.getRegistry = function(){
        function getRegistry(registryPathTemplate, defer, iteration){
            $.ajax({
                url: _.template(registryPathTemplate)({
                    date: new Date().getTime()
                })
            }).success(function(data){
                defer.resolve(data);
            }).error(function(jqXHR, status, error){
                console.error(error);

                if (iteration > 10){
                    defer.reject();
                } else {
                    setTimeout(function(){
                        getRegistry(registryPathTemplate, defer, iteration ++);
                    }, 1000 * (iteration + 1));
                }
            });
        }

        var defer = q.defer(),
            registryPathTemplate = 'https://s3.amazonaws.com/extend.brackets/registry.json?_=${date}';

        getRegistry(registryPathTemplate, defer, 0);

        return defer.promise;
    }
});
