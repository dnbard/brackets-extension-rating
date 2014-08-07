define(function (require, exports, module){
    var englishLanguage = require('../locale/en-US'),
        italianLanguage = require('../locale/it'),
        romanianLanguage = require('../locale/ro'),
        spanishLanguage = require('../locale/es'),
        catalanLanguage = require('../locale/ca-ES'),
        swedishLanguage = require('../locale/sv-SE'),
        dictionaries = {
            'en': englishLanguage,
            'en-GB': englishLanguage,
            'en-US': englishLanguage,
            'it': italianLanguage,
            'it-IT': italianLanguage,
            'ro' : romanianLanguage,
            'ro-RO' : romanianLanguage,
            'es' : spanishLanguage,
            'es-ES' : spanishLanguage,
            'ca' : catalanLanguage,
            'ca-ES' : catalanLanguage,
            'sv' : swedishLanguage,
            'sv-SE' : swedishLanguage
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

        if (t