define(function (require, exports, module) {
    var ExtensionUtils = brackets.getModule('utils/ExtensionUtils');

    //check for errors that cant be handled on runtime
    require('./services/error');

    ExtensionUtils.loadStyleSheet(module, 'styles/main.css');
    ExtensionUtils.loadStyleSheet(module, 'styles/awesome.css');

    require('./services/mutation').init();
    require('./services/registry').init();
});
