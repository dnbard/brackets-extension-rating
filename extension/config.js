define(function (require, exports, module){
    var path = module.uri.replace('config.js', '');

    module.exports = {
        mutationObserverConfig:{
            attributes: true,
            childList: true,
            characterData: true
        },
        root: path,

        onlineTrackingServiceUrl: 'http://brackets-online.herokuapp.com/',

        //don't know how to distinct this states for Bracket Extension yet
        //state: 'development'
        state: 'production'
    }
});
