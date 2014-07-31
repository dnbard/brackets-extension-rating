define(function(require, exports){
    var config = require('../config'),
        appToken = '53d5549ee31c428fe600006f',
        mins60 = 60 * 60 * 1000,
        mins5 = 5 * 60 * 1000,
        keyId = 'ext-online-id';

    function tick(){
        var userId = localStorage.setItem(keyId), url;

        if (userId){
            url = config.onlineTrackingServiceUrl + 'tick/' + appToken + '/' + userId;
        } else {
            url = config.onlineTrackingServiceUrl + 'tick/' + appToken;
        }

        $.ajax({ url: url })
            .success(function(data){
                localStorage.setItem(keyId, data);
            }).error(function(){
                console.log('Can\'t track online status, retry in 5 mins');
                setTimeout(tick, mins5);
            });
    }

    function init(){
        tick();
        setInterval(tick, mins60);
    }

    exports.init = init;
});
