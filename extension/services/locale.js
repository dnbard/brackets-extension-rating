define(function (require, exports, module){
    var dictionaries = {
        'en-US': require('../locale/en-US')
        'it': require('../locale/it')
        //More locals to add here
    },
        _ = require('../vendor/lodash.min'),
        defaultLocale = 'en-US';

    function getCurrentLocale(){
        return brackets.getLocale();
    }

    function tryLoadDictionary(locale){
        var dictionary = require('../locale/' + locale);
        if (dictionary !== undefined){
            dictionaries[locale] = dictionary;
        }

        return dictionary === undefined;
    }

    exports.get = function(id, params){
        var locale = getCurrentLocale(),
            dictionary,
            result;

        if (dictionaries[locale] === undefined){
            locale = defaultLocale;
        }

        dictionary = dictionaries[locale];
        result = dictionary[id];

        if (!result){
            result = dictionaries[defaultLocale][id];
            if (!result){
                throw new Error('No such string in dictionary');
            }
        }

        if (typeof result === 'function'){
            return result(params);
        }

        return result;
    }
});
