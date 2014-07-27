define(function(require, exports){
    var config = require('../config'),
        appToken = '53d5549ee31c428fe600006f',
        mins60 = 60 * 60 * 1000,
        mins5 = 5 * 60 * 1000;

    function tick(){
        $.ajax({ url: config.onlineTrackingServiceUrl + 'tick/' + appToken })
            .error(function(){
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
