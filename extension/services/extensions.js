define(function (require, exports, module){
    var _ = require('../vendor/lodash.min'),
        github = require('./github'),
        extensions = null,
        checkedExtensions = [];

    exports.add = function(rawExt){
        var index = 0,
            commands = [];

        if (extensions !== null){ return };
        extensions = [];

        _.each(rawExt, function(ext){
            var $ext = $(ext),
                obj = {
                    name: $ext.find('.ext-name').text() || '',
                    repository: $ext.find('.ext-desc > p > a').attr('href') || '',
                    author: $ext.find('.ext-author > a').text(),
                    url: $ext.find('.ext-author > a').attr('href') || '',
                    id: $ext.find('.ext-action button').attr('data-extension-id')
                };

            if (obj && typeof obj.name === 'string'){
                extensions.push(obj);
            }
        });

        _.each(extensions, function(ext){
            commands.push(function(){
                if (!github.isAvailable()){ return false; }

                github.get(ext).then(function(obj){
                    console.log(obj.extension.name + ' - ' + obj.repo.stargazers_count + ' stars');
                    obj.extension.stars = obj.repo.stargazers_count;
                    checkedExtensions.push(obj.extension);
                    extensionUpdated(obj.extension);
                }, function(obj){
                    console.log(obj.extension.name + ' / ' + obj.extension.repository + ' failed to load');
                });
                return true;
            });
        });

        setTimeout(commandsIterator, 200);

        function commandsIterator(){
            if (commands.length === 0) {
                gitHubEnded();
                return;
            }
            var command = commands.pop();
            if (command()){
                setTimeout(commandsIterator, 200);
            } else {
                gitHubEnded();
            }
        }

        function gitHubEnded(){
            gitHubCallback(checkedExtensions);
            console.log('all done, commands = ', commands.length);
        }
    }

    function gitHubCallback(checkedExtensions){
        //post data to server
    }

    function extensionUpdated(extension){
        //update UI with stars information
    }
});
