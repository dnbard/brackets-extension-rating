define(function (require, exports, module){
    var target = $('body')[0],
        config = require('../config'),
        dialogId = '.extension-manager-dialog.modal',
        extensionService = require('./extensions');

    var observer = new MutationObserver(function(mutations){
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes && mutation.addedNodes.length === 1){
                dialogAddedMutation(mutation);
            }
        });
    });

    var observerConfig = config.mutationObserverConfig;

    observer.observe(target, observerConfig);

    function dialogAddedMutation(mutation){
        var target = $(mutation.addedNodes[0]),
            token;

        if (target.find(dialogId).length === 1){
            token = setInterval(function(){
                var extensions = target.find('tr'),
                    extensionCount = extensions.length;
                if (extensionCount == 0){
                    return;
                }

                clearInterval(token);
                console.log('Found ' + extensionCount + ' extensions');

                extensionService.add(extensions);

                mutateExistingExtensions(target);
            }, 2500);
        }
    }

    function mutateExistingExtensions(target){
        //mutate existing DOM with stars information
    }
});
