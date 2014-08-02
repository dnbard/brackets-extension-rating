define(function(require, exports){
    var trackingServiceUrl = 'http://brackets-online.herokuapp.com/',
        appToken = '53d5549ee31c428fe600006f',
        mins60 = 60 * 60 * 1000,
        mins5 = 5 * 60 * 1000,
        keyId = 'ext-online-id';

    function tick(){
        var userId = getUserId(appToken, keyId),
            url;

        if (userId){
            url = config.trackingServiceUrl + 'tick/' + appToken + '/' + userId;
        } else {
            url = config.trackingServiceUrl + 'tick/' + appToken;
        }

        $.ajax({ url: url })
            .success(function(data){
                //TODO: create complex model of data in local storage to support any number of extensions
                if (data && data !== 'OK' && data !== 'ERROR'){
                    saveUserId(data, appToken, keyId);
                }
            }).error(function(){
                console.log('Can\'t track online status, retry in 5 mins');
                setTimeout(tick, mins5);
            });
    }

    function init(){
        tick();
        setInterval(tick, mins60);
    }

    function getUserId(appToken, keyId){
        if (typeof appToken !== 'string' || typeof keyId !== 'string'){
            throw new Error('Invalid argument');
        }

        return (localStorage.getItem(keyId) || { })[appToken];
    }

    function saveUserId(id, appToken, keyId){
        if (typeof id !== 'string' || typeof appToken !== 'string' || typeof keyId !== 'string'){
            throw new Error('Invalid argument');
        }

        var obj = (localStorage.getItem(keyId) || { });
        obj[appToken] = id;
        localStorage.setItem(keyId, obj);
    }

    exports.init = init;
});
