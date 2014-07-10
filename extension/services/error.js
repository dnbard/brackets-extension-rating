define(function(require, exports, module){
    var errors = [{
        name: 'Missing Brackets Core functions',
        handler: function(){ return !exports; },
        text: 'Brackets core functionality is broken. "exports" object === undefined. This maybe because of "csslint" extension. More details at https://github.com/dnbard/brackets-extension-rating/issues/23'
    },{
        name: 'Missing Brackets Core functions',
        handler: function(){ return !module; },
        text: 'Brackets core functionality is broken. "module" object === undefined. This maybe because of "csslint" extension. More details at https://github.com/dnbard/brackets-extension-rating/issues/23'
    }],
        error;

    for(var i = 0; i < errors.length; i ++){
        error = errors[i];

        if (error.handler()){ console.error(error.text); }
    }
});
