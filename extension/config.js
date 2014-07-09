define(function (require, exports, module){
    var path = module.uri.replace('config.js', '');

    module.exports = {
        mutationObserverConfig:{
            attributes: true,
            childList: true,
            characterData: true
        },
        root: path,

        //don't know how to distinct this states for Bracket Extension yet
        state: 'production'
    }
});
