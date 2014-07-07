define(function(require, exports, module){
    var registry = null,
        state = 'production'; //TODO: get this from config


    exports.init = function(){
        var path = state === 'production'? 'http://brackets-rating.herokuapp.com/' : 'http://localhost:9000/';

        //temporary, POC
        $.ajax({
            url: path + 'ratings/'
        }).success(function(data){
            registry = data;
        });
    }
});
