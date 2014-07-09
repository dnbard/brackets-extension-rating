define(function (require, exports, module){
    var path = module.uri.replace('config.js', '');

    module.exports = {
        mutationObserverConfig:{
            attributes: true,
            childList: true,
            characterData: true
        },
        root: path
    }
});
